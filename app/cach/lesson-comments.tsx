import { Comments, Lesson } from "@/lib/types/lesson";
import { CommentForm } from "./new-comment-form";
import { Course } from "@/lib/types/course";

type Props = {
    course: Course;
    lesson: Lesson;
    comments: Comments[];
};

export function LessonComments({ course, lesson, comments }: Props){
    return(
        <>
            {/* Comments Section */}
            <div className="rounded-2xl border border-line bg-white p-4 shadow-card sm:p-6 lg:p-7 space-y-4">
                <h3 className="text-sm font-bold text-ink sm:text-base">
                    Comments ({comments.length})
                </h3>

                <CommentForm course={course} lesson={lesson} />

                {comments.length === 0 ? (
                    <p className="text-sm text-muted text-center py-4">
                        No comments yet. Be the first to share your thoughts!
                    </p>
                ) : (
                    <div className="space-y-4">
                        {comments.map((c) => (
                            <div
                                key={c.id}
                                className="border-b border-line pb-4 last:border-none last:pb-0"
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="h-7 w-7 rounded-full bg-brand/10 flex items-center justify-center text-xs font-bold text-brand">
                                        {c.user.substring(1, 3)}
                                    </span>
                                    <span className="text-xs font-semibold text-ink">
                                        {c.user}
                                    </span>
                                </div>
                                <p className="text-sm text-muted leading-relaxed pl-9">
                                    {c.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
