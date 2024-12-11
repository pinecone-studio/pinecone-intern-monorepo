import StoryCard from './StoryCard';
import { useStory } from './providers/StoryProvider';

const Story = () => {
  const { groupedStories } = useStory();
  if (!groupedStories) return;

  return (
    <div className="flex flex-wrap gap-4 w-[630px]">
      {Object.keys(groupedStories).map((userId) => {
        const group = groupedStories[userId];

        return (
          <div key={userId} className="flex flex-col items-start gap-2">
            <StoryCard username={group.userId.username as string} profilePicture={group.userId.profilePicture as string} userId={group.userId._id as string} />
          </div>
        );
      })}
    </div>
  );
};
export default Story;
