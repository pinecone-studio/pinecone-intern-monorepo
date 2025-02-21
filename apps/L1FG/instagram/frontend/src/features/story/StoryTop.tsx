import { OneStoryType } from '@/generated';
import { StoryProfile } from './StoryProfile';
import { StoryProgress } from './StoryProgress';
import { Dispatch, SetStateAction } from 'react';

export const StoryTop = ({
  stories,
  currentIndex,
  setCurrentIndex,
  handleNext,
}: {
  stories: OneStoryType[];
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  handleNext: () => void;
}) => {
  return (
    <div className="top-0 inset-x-0 absolute w-full h-fit px-4 pt-5 pb-8  bg-gradient-to-b from-[rgba(38,38,38,0.8)] to-[rgba(38,38,38,0)]">
      <StoryProgress stories={stories} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} handleNext={handleNext} />
      <StoryProfile story={stories[currentIndex]} />
    </div>
  );
};
