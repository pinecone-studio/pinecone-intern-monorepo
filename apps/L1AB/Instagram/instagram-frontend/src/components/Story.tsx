import StoryCard from './StoryCard';
import { useStory } from './providers/StoryProvider';

const Story = () => {
  const { groupedStories } = useStory();
  if (!groupedStories) return <p>Loading...</p>;

  return (
    <div className="flex flex-wrap gap-4">
      {Object.keys(groupedStories!).map((userId, index) => {
        const group = groupedStories![userId];

        return (
          <div data-testid={`StoryCard-${index}`} key={userId} className="flex flex-col items-start gap-2">
            <StoryCard index={index} username={group.userId.username as string} profilePicture={group.userId.profilePicture as string} userId={group.userId._id as string} />
          </div>
        );
      })}
    </div>
  );
};
export default Story;
