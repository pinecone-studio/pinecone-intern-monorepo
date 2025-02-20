'use client';
import { useState } from 'react';
import { StoryNextButton } from './StoryNextButton';
import { StoryPreviousButton } from './StoryPreviousButton';
import { StoryTop } from './StoryTop';
import { OneStoryType } from '@/generated';
import { getStoryIndex } from '@/features/utils/get-story-index';
import { StoryImage } from './StoryImage';

export const StoryCarousel = ({ stories, seenStoryTime }: { stories: OneStoryType[]; seenStoryTime: number }) => {
  const latestStoryIndex = getStoryIndex({ stories: stories, seenStoryTime: seenStoryTime });
  const [currentIndex, setCurrentIndex] = useState<number>(latestStoryIndex);
  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(stories.length - 1, prev + 1));
  };
  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };
  return (
    <div className="w-fit h-[90%] flex items-center justify-center relative  mx-auto gap-2">
      <StoryPreviousButton shouldExist={currentIndex !== 0} handlePrevious={handlePrevious} />
      <div className="w-[522px] h-full  rounded-xl relative  flex-shrink-0 overflow-hidden">
        <StoryTop stories={stories} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
        <StoryImage currentStory={stories[currentIndex]} />
      </div>
      <StoryNextButton shouldExist={currentIndex !== stories.length - 1} handleNext={handleNext} />
    </div>
  );
};
