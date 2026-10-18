export type CertificateStatus = 'active' | 'revoked' | 'expired';

export interface Certificate {
    // Essential Attributes
    id: string; // UUID
    certificate_code: string;
    user_id: string; // UUID
    course_id: string; // UUID
    issued_at: Date | string;
    pdf_url: string;

    // Printed Snapshot Data
    student_name_on_cert: string;
    course_title_on_cert: string;
    instructor_name_on_cert?: string | null;

    // Verification & Status
    status: CertificateStatus;
    expiration_date?: Date | string | null;
}

export type StudentTestimonial = {
    id: string;
    name: string;
    role: string;
    learningPath: string;
    quote: string;
    initials: string;
    avatarColor: string;
};