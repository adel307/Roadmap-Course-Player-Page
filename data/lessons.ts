import { Lesson } from "@/lib/types/lesson";
import { courses } from "./courses";
import { getPlaylistId } from "@/lib/getPlaylistId";
import { fetchLessons } from "@/lib/api/fetchLessons";

async function loadLessons(): Promise<Lesson[]> {
    const allLessons: Lesson[] = [];

    for (const course of courses) {
        const playlistId = getPlaylistId(course.promo_video_url);
        if (playlistId) {
            const courseLessons = await fetchLessons(course.id, playlistId);
            allLessons.push(...courseLessons.lessons);
        }
    }

    return allLessons;
}

export const Lessons: Lesson[] = await loadLessons();