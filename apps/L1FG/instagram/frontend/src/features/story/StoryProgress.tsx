import { OneStoryType } from '@/generated';
import { Dispatch, SetStateAction, useId } from 'react';
import { useRouter } from 'next/navigation';
import { StoryProgressSeen } from './StoryProgressSeen';
import { StoryProgressUnseen } from './StoryProgressUnseen';
import { StoryProgressLeftToSeen } from './StoryProgressLeftToSeen';

export const StoryProgress = ({ stories, currentIndex, setCurrentIndex }: { stories: OneStoryType[]; currentIndex: number; setCurrentIndex: Dispatch<SetStateAction<number>> }) => {
  const router = useRouter();
  const id = useId();
  const count = stories.length;
  const userId = stories[0].userId;
  const onStoryComplete = () => {
    if (currentIndex + 1 >= stories.length) {
      router.push(`/${userId}`);
    }
  };
  return (
    <div className={`w-full grid gap-[2px] grid-cols-${count} `}>
      {Array.from({ length: count }, (_, i) => i).map((i) => {
        if (i < currentIndex) {
          return <StoryProgressSeen key={`${id}-${i}`} />;
        }
        if (i == currentIndex) {
          return <StoryProgressUnseen key={`${id}-${i}`} count={count} onStoryComplete={onStoryComplete} setCurrentIndex={setCurrentIndex} />;
        }
        return <StoryProgressLeftToSeen key={`${id}-${i}`} />;
      })}
    </div>
  );
};
