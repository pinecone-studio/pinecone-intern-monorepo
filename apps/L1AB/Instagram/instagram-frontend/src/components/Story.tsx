import StoryCard from './StoryCard';
import { useStory } from './providers/StoryProvider';

const Story = () => {
  const data = useStory();
  const storyData = data.groupStories;

  return (
    <div className="flex gap-4">
      {storyData?.map((group, index) => {
        return (
          <div key={index}>
            {group.slice(0, 1).map((story, i) => {
              return <StoryCard key={i} username={story.userId.username} profilePicture={story.userId.profilePicture} userId={story.userId._id} />;
            })}
          </div>
        );
      })}
    </div>
  );
};
export default Story;
