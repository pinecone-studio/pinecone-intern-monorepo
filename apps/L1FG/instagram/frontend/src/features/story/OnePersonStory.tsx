'use client';

import { useGetOneStoryQuery } from '@/generated';
import { StoryCarousel } from './StoryCarousel';

export const OnePersonStory = ({ userName }: { userName: string }) => {
  const { data, loading } = useGetOneStoryQuery({
    variables: {
      userName: userName,
    },
    onError: (error) => {
      console.log('error', error);
    },
  });
  if (loading || !data) {
    return;
  }
  const stories = data?.getOneStory[0].items;
  const seenStoryTime = data?.getOneStory[0].seenStoryTime;
  console.log('stories:', stories);
  return <StoryCarousel stories={stories} seenStoryTime={seenStoryTime} />;
};
