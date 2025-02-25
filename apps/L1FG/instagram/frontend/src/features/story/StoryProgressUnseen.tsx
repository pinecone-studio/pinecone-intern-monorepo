'use client';

import { useCache } from '@/components/providers/CacheProvider';
import { OneStoryType, useUpdateStoryViewMutation } from '@/generated';
import { useEffect, useState } from 'react';

export const StoryProgressUnseen = ({
  count,
  currentIndex,
  onStoryComplete,
  stories,
  seenStoryTime,
}: {
  count: number;
  currentIndex: number;
  onStoryComplete: () => void;
  stories: OneStoryType[];
  seenStoryTime: number;
}) => {
  const [progress, setProgress] = useState(0);
  const { cacheStoryView } = useCache();
  const [udpateStoryView] = useUpdateStoryViewMutation();
  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min((elapsedTime / 5000) * 100, 100);
      setProgress(newProgress);
      if (newProgress >= 100) {
        clearInterval(timer);
        onStoryComplete();
      }
    }, 100);
    return () => clearInterval(timer);
  }, [count, onStoryComplete]);
  useEffect(() => {
    const makeNextStoryView = async () => {
      try {
        await udpateStoryView({
          variables: {
            input: {
              ownerId: stories[currentIndex].user._id,
              seen: stories[currentIndex].expiringAt,
            },
          },
        });
        cacheStoryView({
          targetId: stories[currentIndex].user._id,
          seenStoryTime: stories[currentIndex].expiringAt,
        });
      } catch (error) {
        console.log('error', error);
      }
    };
    if (seenStoryTime < stories[currentIndex].expiringAt) {
      makeNextStoryView();
    }
  }, [currentIndex]);
  return (
    <div className="h-[2px] bg-gray-400 rounded-full overflow-hidden">
      <div className="h-full bg-white transition-all duration-[16ms] ease-linear" style={{ width: `${progress}%` }} />
    </div>
  );
};
