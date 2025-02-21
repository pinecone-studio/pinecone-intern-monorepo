'use client';

import { useGetOneStoryQuery } from '@/generated';
import { OnePersonStoryCarousel } from './OnePersonStoryCarousel';

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
  return <OnePersonStoryCarousel stories={stories} seenStoryTime={seenStoryTime} />;
};
