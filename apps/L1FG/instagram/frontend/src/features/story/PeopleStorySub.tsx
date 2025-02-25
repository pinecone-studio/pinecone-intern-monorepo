'use client';
import { useRouter } from 'next/navigation';
import { GetDetailedAllStoriesQuery } from '@/generated';
import { useState } from 'react';
import { PeopleStoryCarousel } from './PeopleStoryCarousel';
import { getStoryIndex } from '../utils/get-story-index';
import { NeighborhoodStory } from './NeighborhoodStory';
import { getBigIndex } from '../utils/get-big-index';

export const PeopleStorySub = ({ data, userName }: { data: GetDetailedAllStoriesQuery; userName: string }) => {
  const router = useRouter();
  const foundBigIndex = getBigIndex({ userName: userName, storyTray: data.getPreviewAllStories.storyTray });
  const [bigIndex, setBigIndex] = useState<number>(foundBigIndex);
  const tray = data?.getPreviewAllStories.storyTray || [];
  const [newPersonStoryStart, setNewPersonStoryStart] = useState(getStoryIndex({ stories: tray[bigIndex].items, seenStoryTime: tray[bigIndex].seenStoryTime }));
  const seenStoryTime = tray[bigIndex].seenStoryTime;
  const handleBigNext = () => {
    if (bigIndex + 1 >= tray.length) {
      router.back();
    } else {
      setBigIndex((prev) => Math.min(tray.length - 1, prev + 1));
      setNewPersonStoryStart(getStoryIndex({ stories: tray[bigIndex].items, seenStoryTime: tray[bigIndex].seenStoryTime }));
    }
  };
  const handleBigPrevious = () => {
    if (bigIndex - 1 < 0) {
      setBigIndex((prev) => Math.max(0, prev - 1));
    } else {
      setBigIndex((prev) => Math.max(0, prev - 1));
      setNewPersonStoryStart(tray[bigIndex - 1].items.length - 1);
    }
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
              seenStoryTime={seenStoryTime}
              newPersonStoryStart={newPersonStoryStart}
            />
          );
        }

        return <NeighborhoodStory node={node} key={node._id} />;
      })}
    </div>
  );
};
