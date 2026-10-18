import { getYouTubeClient } from "./youtube";
import { parseISODuration } from "./duration";
import slugify from "slugify";
import { Lesson } from "./types/lesson";
import type { youtube_v3 } from "googleapis";

interface GetPlaylistLessonsOptions {
  playlistId: string;
  courseId: string;
  freePreviewFirst?: boolean;
}

export async function getPlaylistLessons({
  playlistId,
  courseId,
  freePreviewFirst = true,
}: GetPlaylistLessonsOptions): Promise<Lesson[]> {
  const youtube = getYouTubeClient();

  // Fetch all playlist items.
  const items: youtube_v3.Schema$PlaylistItem[] = [];
  let nextPageToken: string | undefined = undefined;

  do {
    const res:any = await youtube.playlistItems.list({
      part: ["snippet", "contentDetails"],
      playlistId,
      maxResults: 50,
      pageToken: nextPageToken,
    });

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

  const lessons: Lesson[] = items.map((item, index) => {
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
    };
  });

  return lessons;
}
