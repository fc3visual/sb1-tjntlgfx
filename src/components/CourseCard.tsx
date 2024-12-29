import React from 'react';
import { Course } from '../types/course';
import { FaVideo, FaFilePdf, FaCheck } from 'react-icons/fa';

interface CourseCardProps {
  course: Course;
  completed: boolean;
  onComplete: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, completed, onComplete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{course.title}</h3>
        {course.content_type === 'video' ? (
          <FaVideo className="text-blue-500 text-xl" />
        ) : (
          <FaFilePdf className="text-red-500 text-xl" />
        )}
      </div>
      <p className="text-gray-600 mb-4">{course.description}</p>
      <div className="flex justify-between items-center">
        <button
          onClick={onComplete}
          disabled={completed}
          className={`px-4 py-2 rounded-md flex items-center gap-2 ${
            completed
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {completed ? (
            <>
              <FaCheck /> Concluído
            </>
          ) : (
            'Marcar como concluído'
          )}
        </button>
      </div>
    </div>
  );
};