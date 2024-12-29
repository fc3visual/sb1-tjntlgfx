import React from 'react';
import { Course } from '../types/course';

interface ContentViewerProps {
  course: Course;
}

export const ContentViewer: React.FC<ContentViewerProps> = ({ course }) => {
  if (course.content_type === 'video') {
    return (
      <div className="aspect-w-16 aspect-h-9">
        <video
          controls
          className="w-full rounded-lg"
          src={course.content_url}
        >
          Seu navegador não suporta a reprodução de vídeos.
        </video>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px]">
      <iframe
        src={course.content_url}
        className="w-full h-full rounded-lg"
        title={course.title}
      >
        Seu navegador não suporta a visualização de PDFs.
      </iframe>
    </div>
  );
};