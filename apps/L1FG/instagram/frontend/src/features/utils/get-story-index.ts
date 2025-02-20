import { OneStoryType } from '@/generated';

export const getStoryIndex = ({ stories, seenStoryTime }: { stories: OneStoryType[]; seenStoryTime: number }): number => {
  const index = stories?.findIndex((story) => {
    return story.expiringAt == seenStoryTime;
  });
  const latestStoryIndex = index === -1 ? 0 : index;
  if (latestStoryIndex == stories.length - 1) {
    return 0;
  }
  if (latestStoryIndex !== 0) {
    return latestStoryIndex + 1;
  }
  return latestStoryIndex;
};
