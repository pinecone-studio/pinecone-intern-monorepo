'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const StoryProgressUnseen = ({ count, setCurrentIndex, onStoryComplete }: { count: number; setCurrentIndex: Dispatch<SetStateAction<number>>; onStoryComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min((elapsedTime / 5000) * 100, 100);
      setProgress(newProgress);
      if (newProgress >= 100) {
        clearInterval(timer);
        setCurrentIndex((prev) => Math.min(count - 1, prev + 1));
        onStoryComplete();
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="h-[2px] bg-gray-400 rounded-full overflow-hidden">
      <div className="h-full bg-white transition-all duration-[16ms] ease-linear" style={{ width: `${progress}%` }} />
    </div>
  );
};
