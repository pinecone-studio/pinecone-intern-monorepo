'use client';
import { useGetDetailedAllStoriesQuery } from '@/generated';
import { PeopleStorySub } from './PeopleStorySub';
export const PeopleStory = () => {
  const { data } = useGetDetailedAllStoriesQuery();
  if (!data) {
    return;
  }
  return <PeopleStorySub data={data} />;
};

export default PeopleStory;
