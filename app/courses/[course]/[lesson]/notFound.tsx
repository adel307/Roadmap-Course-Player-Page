"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type NotFoundReason =
    | "invalid-course-id"
    | "course-not-found"
    | "lesson-not-found"
    | "invalid-lesson-id";

type NotFoundProps = {
    lessonID?: string;
    courseID?: string;
    reason?: NotFoundReason;
};

type ReasonContent = {
    title: string;
    description: string;
    icon: React.ReactNode;
};

function getReasonContent(
    reason: NotFoundReason | undefined,
    lessonID?: string
): ReasonContent {
    switch (reason) {
        case "invalid-course-id":
            return {
                title: "معرّف الكورس غير صالح",
                description:
                    "الرابط الذي تحاول الوصول إليه لا يحتوي على معرّف كورس صحيح. تأكد من الرابط أو عد إلى قائمة الكورسات.",
                icon: <BrokenLinkIcon />,
            };
        case "course-not-found":
            return {
                title: "الكورس غير موجود",
                description:
                    "لم نتمكن من العثور على هذا الكورس. ربما تم حذفه أو أن الرابط غير صحيح.",
                icon: <CourseOffIcon />,
            };
        case "lesson-not-found":
        case "invalid-lesson-id":
        default:
            return {
                title: "الدرس غير موجود",
                description: lessonID
                    ? `لم نتمكن من العثور على الدرس بالمعرّف "${lessonID}". ربما تم حذفه أو أن الرابط غير صحيح.`
                    : "لم نتمكن من العثور على الدرس المطلوب. ربما تم حذفه أو أن الرابط غير صحيح.",
                icon: <LessonOffIcon />,
            };
    }
}

export default function NotFound({
    lessonID,
    courseID,
    reason,
}: NotFoundProps) {
    const router = useRouter();
    const { title, description, icon } = getReasonContent(reason, lessonID);

    // رابط العودة: صفحة الكورس إن وُجد معرّف، وإلا صفحة الكورسات
    const backHref = courseID ? `/courses/${courseID}` : "/courses";

    return (
        <main
            dir="rtl"
            className="flex min-h-screen flex-col items-center justify-center gap-6 bg-page/55 p-6 text-center dark:bg-page"
        >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                {icon}
            </div>

            <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                    {title}
                </h1>
                <p className="max-w-md text-sm text-muted sm:text-base">
                    {description}
                </p>
                {lessonID && (
                    <p className="text-xs text-muted/70">
                        معرّف الدرس:{" "}
                        <span className="font-mono">{lessonID}</span>
                    </p>
                )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                    onClick={() => router.back()}
                    className="rounded-md border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition hover:bg-page"
                >
                    رجوع
                </button>

                <Link
                    href="/"
                    className="rounded-md border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition hover:bg-page"
                >
                    الصفحة الرئيسية
                </Link>

                <Link
                    href={backHref}
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                >
                    {courseID ? "العودة إلى الكورس" : "تصفح الكورسات"}
                </Link>
            </div>
        </main>
    );
}

/* ============================================================
   أيقونات SVG بسيطة (بدون مكتبات خارجية)
   ============================================================ */

function BrokenLinkIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10"
            aria-hidden="true"
        >
            <path d="M9 15l6-6" />
            <path d="M11 6l.463-.536a5 5 0 0 1 7.071 7.072L18 13" />
            <path d="M13 18l-.397.534a5.068 5.068 0 0 1-7.127 0 4.972 4.972 0 0 1 0-7.071L6 11" />
        </svg>
    );
}

function CourseOffIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10"
            aria-hidden="true"
        >
            <path d="M4 4l16 16" />
            <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
            <path d="M8 10h2M8 14h4" />
        </svg>
    );
}

function LessonOffIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10"
            aria-hidden="true"
        >
            <path d="M3 3l18 18" />
            <path d="M14 4h5v5" />
            <path d="M4 14v-5h5" />
            <path d="M10 4H6a2 2 0 0 0-2 2v4" />
            <path d="M20 10v4" />
            <path d="M4 16v2a2 2 0 0 0 2 2h4" />
            <path d="M16 20h2a2 2 0 0 0 2-2v-2" />
        </svg>
    );
}