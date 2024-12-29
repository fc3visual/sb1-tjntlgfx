import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Course, UserProgress } from '../types/course';
import { CourseCard } from '../components/CourseCard';
import { ProgressBar } from '../components/ProgressBar';

export const Dashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
    loadProgress();
  }, []);

  const loadCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('order');
    
    if (error) {
      console.error('Erro ao carregar cursos:', error);
      return;
    }

    setCourses(data);
    setLoading(false);
  };

  const loadProgress = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Erro ao carregar progresso:', error);
      return;
    }

    setProgress(data);
  };

  const handleComplete = async (courseId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        course_id: courseId,
        completed: true,
        completed_at: new Date().toISOString()
      });

    if (error) {
      console.error('Erro ao atualizar progresso:', error);
      return;
    }

    loadProgress();
  };

  const calculateProgress = () => {
    if (!courses.length) return 0;
    const completed = progress.filter(p => p.completed).length;
    return Math.round((completed / courses.length) * 100);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Portal de Onboarding</h1>
      
      <div className="mb-8">
        <ProgressBar progress={calculateProgress()} />
      </div>

      <div className="space-y-6">
        {courses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            completed={progress.some(p => p.course_id === course.id && p.completed)}
            onComplete={() => handleComplete(course.id)}
          />
        ))}
      </div>
    </div>
  );
};