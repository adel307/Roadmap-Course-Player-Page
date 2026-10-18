import { Lesson } from "../types/lesson";

export interface LessonsResponse {
    count: number;
    lessons: Lesson[];
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function fetchLessons(courseId: string, playlistId: string): Promise<LessonsResponse> {
    try {
        const response = await fetch(`${baseUrl}/api/courses/${courseId}/${playlistId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            let errorDetails = "";
            try {
                const errorBody = await response.json();
                errorDetails = errorBody.message || JSON.stringify(errorBody);
            } catch {
                errorDetails = response.statusText;
            }

            throw new Error(`HTTP Error: ${response.status} - ${errorDetails}`);
        }

        const data: LessonsResponse = await response.json();
        return data;

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Fetch Lessons Detailed Error:", {
                name: error.name,
                message: error.message,
                stack: error.stack,
            });
            throw new Error(`فشل جلب الدروس: ${error.message}`);
        } else {
            console.error("Unknown Error occurred:", error);
            throw new Error("حدث خطأ غير معروف أثناء جلب الدروس.");
        }
    }
}