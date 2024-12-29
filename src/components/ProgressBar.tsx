import React from 'react';
import * as Progress from '@radix-ui/react-progress';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full">
      <Progress.Root
        className="relative overflow-hidden bg-gray-200 rounded-full w-full h-4"
        value={progress}
      >
        <Progress.Indicator
          className="bg-blue-500 w-full h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
      <p className="text-sm text-gray-600 mt-2">
        {progress}% concluído
      </p>
    </div>
  );
};