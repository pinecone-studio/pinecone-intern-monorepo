import { OneStoryType } from '@/generated';
import { useId } from 'react';
import { StoryProgressSeen } from './StoryProgressSeen';
import { StoryProgressUnseen } from './StoryProgressUnseen';
import { StoryProgressLeftToSeen } from './StoryProgressLeftToSeen';

export const StoryProgress = ({ stories, currentIndex, handleNext, seenStoryTime }: { stories: OneStoryType[]; currentIndex: number; handleNext: () => void; seenStoryTime: number }) => {
  const id = useId();
  const count = stories.length;
  const onStoryComplete = () => {
    handleNext();
  };
  return (
    <div className={`w-full grid gap-[2px] grid-cols-${count} `}>
      {Array.from({ length: count }, (_, i) => i).map((i) => {
        if (i < currentIndex) {
          return <StoryProgressSeen key={`${id}-${i}`} />;
        }
        if (i == currentIndex) {
          return <StoryProgressUnseen key={`${id}-${i}`} currentIndex={currentIndex} count={count} onStoryComplete={onStoryComplete} stories={stories} seenStoryTime={seenStoryTime} />;
        }
        return <StoryProgressLeftToSeen key={`${id}-${i}`} />;
      })}
    </div>
  );
};
