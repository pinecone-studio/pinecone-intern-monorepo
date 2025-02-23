import { OneStoryType } from '@/generated';
import { StoryProfile } from './StoryProfile';
import { StoryProgress } from './StoryProgress';

export const StoryTop = ({ stories, currentIndex, handleNext, seenStoryTime }: { stories: OneStoryType[]; currentIndex: number; handleNext: () => void; seenStoryTime: number }) => {
  return (
    <div className="top-0 inset-x-0 absolute w-full h-fit px-4 pt-5 pb-8  bg-gradient-to-b from-[rgba(38,38,38,0.8)] to-[rgba(38,38,38,0)]">
      <StoryProgress stories={stories} currentIndex={currentIndex} handleNext={handleNext} seenStoryTime={seenStoryTime} />
      <StoryProfile story={stories[currentIndex]} />
    </div>
  );
};
