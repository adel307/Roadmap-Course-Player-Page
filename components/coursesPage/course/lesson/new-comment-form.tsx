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
    const  setIsFocused = useState(false)[1];

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
        <form onSubmit={handleAddComment} className="flex gap-4 items-start mb-6">
            {/* Avatar */}
            <div className="
                shrink-0
                h-12 w-12
                rounded-full
                bg-[#16223a] dark:bg-[#2bae8e]
                flex items-center justify-center
                text-sm font-bold text-white
                shadow-md shadow-primary/30
                z-10
            ">
                CU
            </div>

            {/* Input & Button */}
            <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-center mb-2">
                    <span className="text-sm font-semibold text-ink">
                        Current User
                    </span>
                </div>

                <div className="
                    bg-card dark:bg-[#1B2A3F]
                    p-2 rounded-xl rounded-tl-none
                    shadow-card dark:shadow-lg dark:shadow-black/25
                    transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                    flex flex-col sm:flex-row gap-2 sm:gap-3
                    border border-line dark:border-white/10
                    focus-within:border-brand
                    focus-within:shadow-[0_0_12px_rgba(43,174,142,0.2)]
                ">
                    <textarea
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Share your thoughts or ask a question..."
                        rows={1}
                        className="
                            flex-1
                            resize-none
                            rounded-lg border border-line bg-white
                            px-2 py-2
                            text-sm text-ink
                            placeholder:text-muted/70
                            leading-relaxed
                            focus:border-brand focus:outline-none
                            dark:border-white/10 dark:bg-[#16223a] dark:text-white
                        "
                        required
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting || !newCommentText.trim()}
                        className="
                            shrink-0
                            self-end sm:self-auto
                            rounded-lg
                            bg-primary
                            px-4 py-2
                            text-sm font-semibold
                            transition-all duration-300
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                            disabled:hover:bg-primary
                            not-disabled:hover:bg-[#2bae8e]
                            not-disabled:hover:shadow-[0_0_15px_rgba(43,174,142,0.6)]
                        "
                    >
                        {isSubmitting ? "Posting..." : "Post"}
                    </button>
                </div>
            </div>
        </form>
    );
}