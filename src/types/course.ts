export interface Course {
  id: string;
  title: string;
  description: string;
  content_type: 'video' | 'pdf';
  content_url: string;
  order: number;
  created_at: string;
}

export interface UserProgress {
  user_id: string;
  course_id: string;
  completed: boolean;
  completed_at?: string;
}