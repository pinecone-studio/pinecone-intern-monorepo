'use client';
import { useGetDetailedAllStoriesQuery } from '@/generated';
import { PeopleStorySub } from './PeopleStorySub';
export const PeopleStory = ({ userName }: { userName: string }) => {
  const { data } = useGetDetailedAllStoriesQuery();
  if (!data) {
    return;
  }
  return <PeopleStorySub data={data} userName={userName} />;
};

export default PeopleStory;
