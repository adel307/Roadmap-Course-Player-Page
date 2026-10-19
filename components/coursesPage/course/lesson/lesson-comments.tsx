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
            <div className="rounded-2xl border border-line bg-card p-4 shadow-sm sm:p-6 lg:p-7 space-y-6">
                <h3 className="text-sm font-bold text-ink sm:text-base">
                    Comments ({comments.length})
                </h3>

                {/* New Comment Form */}
                <CommentForm course={course} lesson={lesson} />

                {comments.length === 0 ? (
                    <p className="text-sm text-muted text-center py-4">
                        No comments yet. Be the first to share your thoughts!
                    </p>
                ) : (
                    <div className="space-y-6">
                        {comments.map((c) => (
                            <div key={c.id} className="flex gap-4 items-start">
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
                                    {c.user.substring(0, 2).toUpperCase()}
                                </div>

                                {/* Name & Comment Card */}
                                <div className="flex-1 min-w-0 pt-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-semibold text-ink">
                                            {c.user}
                                        </span>
                                        {/* Optional: Time can be added here if available in the type */}
                                    </div>
                                    
                                    {/* Comment Text Card */}
                                    <div className="
                                        bg-[#1B2A3F] text-white
                                        p-4 rounded-xl rounded-tl-none
                                        shadow-lg shadow-black/20
                                        transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                                        hover:-translate-y-1
                                        hover:shadow-xl hover:shadow-black/30
                                        motion-reduce:transition-none
                                        motion-reduce:hover:translate-y-0
                                    ">
                                        <p className="text-sm leading-relaxed break-words">
                                            {c.comment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}