import { OneStoryType } from '@/generated';
import { StoryProfile } from './StoryProfile';
import { StoryProgress } from './StoryProgress';

export const StoryTop = ({ stories }: { stories: OneStoryType[] }) => {
  if (!stories) return;
  return (
    <div className="w-full px-4 pt-5 pb-8">
      <StoryProgress stories={stories} />
      <StoryProfile story={stories[0]} />
    </div>
  );
};
