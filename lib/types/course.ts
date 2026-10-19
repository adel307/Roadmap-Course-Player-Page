import { Lesson } from "./lesson";

export type CourseStatus = 'draft' | 'pending' | 'published' | 'archived';
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'all_levels';

export interface Course {
    // Essential Attributes
    id: string; // UUID
    isFeatured: boolean;
    inMyCard: boolean;
    title: string;
    slug: string;
    description: string;
    thumbnail_url: string;
    price: number;
    language: string;
    status: CourseStatus;
    created_at: Date | string;
    updated_at: Date | string;

    // Advanced Attributes
    discount_price?: number | null;
    promo_video_url?: string | null;
    level: CourseLevel;

    // Cached Stats
    average_rating: number;
    total_reviews: number;
    total_enrollments: number;
    total_duration_seconds: number;

    // SEO & JSON Meta
    meta_title?: string | null;
    meta_description?: string | null;
    requirements: string[];
    what_will_learn: string[];
}

export interface CurriculumSection {
    id: string;
    title: string;
    lessons: Lesson[];
}

export interface CourseReview {
    id: string;
    name: string;
    date: string;
    rating: number;
    comment: string;
    avatarColor: string;
}
