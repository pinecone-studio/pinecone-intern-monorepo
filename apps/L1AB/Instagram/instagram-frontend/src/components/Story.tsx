import { useGetAllStoriesQuery } from '@/generated';
import StoryCard from './StoryCard';

const Story = () => {
  const { data } = useGetAllStoriesQuery();
  const stories = data?.getAllStories;
  console.log('sssss', stories);

  return (
    <div className="flex gap-4">
      {stories?.map((story, index) => {
        return <StoryCard key={index} testId={index} image={story.image} username={story.userId.username} profilePicture={story.userId.profilePicture} />;
      })}
    </div>
  );
};
export default Story;
