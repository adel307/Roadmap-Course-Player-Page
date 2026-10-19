"use client";

import { useState } from "react";
import { Comments, Lesson } from "@/lib/types/lesson";
import { Course } from "@/lib/types/course";
import { useCourseStore } from "@/lib/store/useCourseStore";

type Props = {
    course: Course;
    lesson: Lesson;
};

export function CommentForm({ course, lesson }: Props) {
    const [newCommentText, setNewCommentText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateLesson = useCourseStore((state) => state.updateLesson);

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCommentText.trim()) return;

        setIsSubmitting(true);
        try {
            const newComment: Comments = {
                id: Date.now().toString(),
                user: "Current User",
                comment: newCommentText.trim(),
                coursesId: course.id,
            };

            const currentComments = lesson.comments || [];

            const updatedComments = [newComment, ...currentComments];

            updateLesson(course.id, lesson.id, {
                comments: updatedComments,
            });

            setNewCommentText("");
        } catch (error) {
            console.error("Failed to add comment:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <form onSubmit={handleAddComment} className="space-y-3">
            <textarea
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Share your thoughts or ask a question about this lesson..."
                rows={3}
                className="w-full rounded-xl border border-line p-3 text-sm text-ink focus:border-brand focus:outline-none"
                required
            />
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting || !newCommentText.trim()}
                    className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                    {isSubmitting ? "Posting..." : "Post Comment"}
                </button>
            </div>
        </form>
    );
}