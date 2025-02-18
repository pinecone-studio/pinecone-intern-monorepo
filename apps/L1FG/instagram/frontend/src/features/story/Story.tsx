'use client';
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useGetDetailedAllStoriesQuery } from '@/generated';
export const Story = () => {
  const { data } = useGetDetailedAllStoriesQuery();
  const stories = data?.getPreviewAllStories.storyTray || [];
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(stories.length - 1, prev + 1));
  };
  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };
  return (
    <div className="flex-1 flex items-center justify-center gap-14 px-4" data-testid="story-viewer">
      {/* Navigation */}
      <div className="flex items-center gap-2">
        {stories.map((node, index) => {
          const isCurrent = index === currentIndex;
          const isAdjacent = Math.abs(index - currentIndex) === 1;

          if (!isCurrent && !isAdjacent) return null;

          if (isCurrent) {
            return (
              <div key={node._id} className="flex items-center gap-2" data-testid="current-story">
                <button
                  onClick={handlePrevious}
                  data-testid="previous-button"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft />
                </button>
                <div className="w-[522px] h-[926px] rounded-xl overflow-hidden relative" data-testid="story-content">
                  <div className={`w-full h-full relative`} data-testid="story-background" />
                  <Image src={node.items[0].storyImage} fill alt="image" />
                </div>
                <button
                  onClick={handleNext}
                  data-testid="next-button"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
                  disabled={currentIndex === stories.length - 1}
                >
                  <ChevronRight />
                </button>
              </div>
            );
          }

          return (
            <div key={node._id} className="w-[245px] h-[433px] relative rounded-xl overflow-hidden" data-testid={`story-thumbnail-${index}`}>
              <Image src={node.items[0].storyImage} fill alt="image" />
              <div className={`w-full h-full`}>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white/20" />
                    <p className="text-white">{node.user.userName}</p>
                    <p className="text-gray-400">created at</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Story;
