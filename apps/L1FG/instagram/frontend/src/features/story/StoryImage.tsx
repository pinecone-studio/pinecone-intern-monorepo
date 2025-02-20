import { OneStoryType } from '@/generated';

export const StoryImage = ({ currentStory }: { currentStory: OneStoryType }) => {
  return (
    <div
      className="w-full h-full"
      style={{
        backgroundImage: `url(${currentStory.storyImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    ></div>
  );
};
