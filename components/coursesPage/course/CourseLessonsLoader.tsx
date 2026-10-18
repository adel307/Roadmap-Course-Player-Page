"use client";

import { useEffect } from "react";
import { useCourseStore } from "@/lib/store/useCourseStore";
import { getPlaylistId } from "@/lib/getPlaylistId";
import { fetchLessons } from "@/lib/api/fetchLessons";

interface CourseLessonsLoaderProps {
  courseId: string;
  promoVideoUrl: string;
}

export function CourseLessonsLoader({ courseId, promoVideoUrl }: CourseLessonsLoaderProps) {
  const { fetchLessonsForCourse } = useCourseStore();

  useEffect(() => {
    const playlistId = getPlaylistId(promoVideoUrl);
    if (playlistId) {
      fetchLessonsForCourse(
        courseId,
        playlistId,
        async (id, url) => {
          const result = await fetchLessons(id, url);
          return result.lessons;
        }
      );
    }
  }, [courseId, promoVideoUrl, fetchLessonsForCourse]);

  return null;
}