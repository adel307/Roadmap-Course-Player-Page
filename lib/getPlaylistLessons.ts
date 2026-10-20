import { getYouTubeClient } from "./youtube";
import { parseISODuration } from "./duration";
import slugify from "slugify";
import { Comments, GetPlaylistLessonsOptions, Lesson } from "./types/lesson";
import type { youtube_v3 } from "googleapis";
import type { YouTubePlaylistItem, YouTubePlaylistItemResponse } from "./types/youtube.types";

export async function getPlaylistLessons({
    playlistId,
    courseId,
    freePreviewFirst = true,
    fetchComments = true,
    maxCommentsPerVideo = 10,
}: GetPlaylistLessonsOptions): Promise<Lesson[]> {
    const youtube = getYouTubeClient();

    // Fetch all playlist items.
    const items: YouTubePlaylistItem[] = [];
    let nextPageToken: string | undefined = undefined;

    do {
        const res: { data: YouTubePlaylistItemResponse } = await youtube.playlistItems.list({
            part: ["snippet", "contentDetails"],
            playlistId,
            maxResults: 50,
            pageToken: nextPageToken,
        });

        console.log(res)

        if (res.data.items) {
            items.push(...res.data.items);
        }
        nextPageToken = res.data.nextPageToken ?? undefined;
    } while (nextPageToken);

    // Fetch video details, including duration, in batches.
    const videoIds = items
        .map((i) => i.snippet?.resourceId?.videoId)
        .filter((id): id is string => Boolean(id));

    const videosMap: Record<string, youtube_v3.Schema$Video> = {};

    for (let i = 0; i < videoIds.length; i += 50) {
        const chunk = videoIds.slice(i, i + 50);
        const res = await youtube.videos.list({
            part: ["contentDetails", "snippet"],
            id: chunk,
        });

        res.data.items?.forEach((v) => {
            if (v.id) videosMap[v.id] = v;
        });
    }

    const now = new Date();

    const lessons: Lesson[] = await Promise.all(
        items.map(async (item, index) => {
            const videoId = item.snippet?.resourceId?.videoId ?? "";
            const video = videosMap[videoId];

            const durationSeconds = video?.contentDetails?.duration
                ? parseISODuration(video.contentDetails.duration)
                : 0;

            const rawTitle = item.snippet?.title ?? "";
            const cleanTitle = rawTitle.replace(/[{}\[\]]/g, "").trim();
            const order = index + 1;

            const slugBase = slugify(cleanTitle, { lower: true, strict: true });
            const slug = slugBase || `lesson-${order}`;

            const rawDescription = item.snippet?.description ?? "";
            const doubleNewlineIndex = rawDescription.indexOf("\n");

            const trimmedDescription =
                doubleNewlineIndex !== -1
                    ? rawDescription.slice(0, doubleNewlineIndex)
                    : rawDescription;

            let commentsList: Comments[] = [];

            if (fetchComments && videoId) {
                try {
                    const commentsRes = await youtube.commentThreads.list({
                        part: ["snippet"],
                        videoId: videoId,
                        maxResults: maxCommentsPerVideo,
                        textFormat: "plainText",
                    });

                    if (commentsRes.data.items) {
                        commentsList = commentsRes.data.items.map((thread) => {
                            const commentSnippet = thread.snippet?.topLevelComment?.snippet;
                            return {
                                id: thread.id ?? `${videoId}-comment`,
                                user:commentSnippet?.authorDisplayName ?? "Anonymous",
                                comment: commentSnippet?.textDisplay ?? "",
                                coursesId: courseId,
                            };
                        });
                    }
                } catch (error) {
                    console.log(`Could not fetch comments for video ${videoId}:`, error);
                }
            }

            return {
                id: videoId || `${playlistId}-${order}`,
                coursesId: courseId,
                title: cleanTitle,
                slug,
                description: trimmedDescription.slice(0, 500),
                videoProvider: "youtube",
                videoUrl: `https://www.youtube.com/watch?v=${videoId}&list=${playlistId}&index=${order}`,
                thumbnail:
                    item.snippet?.thumbnails?.high?.url ??
                    item.snippet?.thumbnails?.default?.url ??
                    "null",
                body: null,
                durationSeconds,
                order,
                isFreePreview: freePreviewFirst && order === 1,
                isPublished: true,
                createdAt: now,
                updatedAt: now,
                deletedAt: null,
                comments: commentsList,
            };
        })
    )
    return lessons;
}
