export interface Lesson {
  id: string;
  coursesId: string;
  title: string;
  slug: string | null;
  description: string ;
  
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
}

export interface PlaylistApiResponse {
  count: number;
  lessons: Lesson[];
}

export interface PlaylistApiError {
  error: string;
  details?: string;
}