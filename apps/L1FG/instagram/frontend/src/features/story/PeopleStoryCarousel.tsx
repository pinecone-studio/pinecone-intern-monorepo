'use client';
import { useState } from 'react';
import { StoryNextButton } from './StoryNextButton';
import { StoryPreviousButton } from './StoryPreviousButton';
import { StoryTop } from './StoryTop';
import { OneStoryType } from '@/generated';
import { StoryImage } from './StoryImage';
import { getBigPreviousButtonIndex } from '../utils/get-big-previous-button-index';
import { getBigNextButtonIndex } from '../utils/get-big-next-button-index';

export const PeopleStoryCarousel = ({
  stories,
  handleBigNext,
  handleBigPrevious,
  bigIndex,
  trayLength,
  latestStoryIndex,
}: {
  stories: OneStoryType[];
  handleBigNext: () => void;
  handleBigPrevious: () => void;
  bigIndex: number;
  trayLength: number;
  latestStoryIndex: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(latestStoryIndex);
  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(stories.length - 1, prev + 1));
    if (currentIndex + 1 > stories.length - 1) {
      handleBigNext();
    }
  };
  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    if (currentIndex - 1 < 0) {
      handleBigPrevious();
    }
  };
  return (
    <div className="w-fit h-[90%] flex items-center justify-center relative  mx-auto gap-2">
      <StoryPreviousButton shouldExist={getBigPreviousButtonIndex({ bigIndex: bigIndex, currentIndex: currentIndex })} handlePrevious={handlePrevious} />
      <div className="w-[522px] h-full  rounded-xl relative  flex-shrink-0 overflow-hidden">
        <StoryTop stories={stories} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} handleNext={handleNext} />
        <StoryImage currentStory={stories[currentIndex]} />
      </div>
      <StoryNextButton shouldExist={getBigNextButtonIndex({ bigIndex: bigIndex, currentIndex: currentIndex, trayLength: trayLength, storiesLength: stories.length })} handleNext={handleNext} />
    </div>
  );
};
