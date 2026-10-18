import { NextResponse } from "next/server";
import { getPlaylistLessons } from "@/lib/getPlaylistLessons";
import type { PlaylistApiResponse } from "@/lib/types/lesson";

export const revalidate = 3600; // cache لمدة ساعة

export async function GET(
      request: Request,
      { params }: { params: Promise<{ courseId: string, YOUTUBE_PLAYLIST_ID: string }> }
    ): Promise<NextResponse> {
    try {

        const { courseId, YOUTUBE_PLAYLIST_ID } = await params;
        const playlistId = YOUTUBE_PLAYLIST_ID;

        if (!playlistId ) {
            return NextResponse.json(
                { error: `متغيرات البيئة ناقصة playlistId ${playlistId}` },
                { status: 500 }
            );
        }
        if (!courseId) {
            return NextResponse.json(
                { error: `متغيرات البيئة ناقصة courseId ${courseId}` },
                { status: 500 }
            );
        }

        const lessons = await getPlaylistLessons({ playlistId, courseId });

        const payload: PlaylistApiResponse = {
            count: lessons.length,
            lessons,
        };

        const res = NextResponse.json(payload)

        return res;
    } catch (err) {
        const message = err instanceof Error ? err.message : "خطأ غير معروف";
        console.error(err);
        return NextResponse.json(
            { error: "فشل جلب البلاي ليست", details: message },
            { status: 500 }
        );
  }
}