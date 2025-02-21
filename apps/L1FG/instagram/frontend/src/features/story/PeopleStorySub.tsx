'use client';

import { GetDetailedAllStoriesQuery } from '@/generated';
import { useState } from 'react';
import { PeopleStoryCarousel } from './PeopleStoryCarousel';
import { getStoryIndex } from '../utils/get-story-index';
import { NeighborhoodStory } from './NeighborhoodStory';

export const PeopleStorySub = ({ data }: { data: GetDetailedAllStoriesQuery }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [bigIndex, setBigIndex] = useState<number>(0);
  const tray = data?.getPreviewAllStories.storyTray || [];

  const handleBigNext = () => {
    setBigIndex((prev) => Math.min(tray.length - 1, prev + 1));
    setCurrentStoryIndex(getStoryIndex({ stories: tray[bigIndex + 1].items, seenStoryTime: tray[bigIndex + 1].seenStoryTime }));
  };
  const handleBigPrevious = () => {
    setBigIndex((prev) => Math.max(0, prev - 1));
    setCurrentStoryIndex(tray[bigIndex - 1].items.length - 1);
  };
  return (
    <div className="flex items-center gap-2">
      {tray.map((node, index) => {
        const isCurrent = index === bigIndex;
        const isAdjacent = Math.abs(index - bigIndex) === 1;

        if (!isCurrent && !isAdjacent) return null;

        if (isCurrent) {
          return (
            <PeopleStoryCarousel
              key={node._id}
              stories={node.items}
              handleBigNext={handleBigNext}
              handleBigPrevious={handleBigPrevious}
              bigIndex={bigIndex}
              trayLength={tray.length}
              latestStoryIndex={currentStoryIndex}
            />
          );
        }

        return <NeighborhoodStory node={node} key={node._id} />;
      })}
    </div>
  );
};
