import { Course } from "./course";

export type LessonDetailContentProps = {
    course: Course;
    lesson: Lesson | null;
    courseLessons: Lesson[];
    prev: Lesson | null;
    next: Lesson | null;
    related: Course[];
};

export interface Comments{
    id: string;
    user:string;
    comment: string;
    coursesId: string;
}

export interface Lesson {
    id: string;
    coursesId: string;
    title: string;
    slug: string | null;
    description: string ;
    isSaved:boolean;

    videoProvider: string | null;
    videoUrl: string | null;
    thumbnail:string;
    body: string | null;
    durationSeconds: number;

    order: number;
    isFreePreview: boolean;
    isPublished: boolean;

    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    comments: Comments[],
}

export interface PlaylistApiResponse {
    count: number;
    lessons: Lesson[];
}

export interface PlaylistApiError {
    error: string;
    details?: string;
}

export interface GetPlaylistLessonsOptions {
    playlistId: string;
    courseId: string;
    freePreviewFirst?: boolean;
    fetchComments?: boolean;
    maxCommentsPerVideo?: number;
}