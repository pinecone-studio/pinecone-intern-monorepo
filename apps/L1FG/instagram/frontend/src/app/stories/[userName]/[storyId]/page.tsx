import { OnePersonStory } from '@/features/story/OnePersonStory';
import PeopleStory from '@/features/story/PeopleStory';
import { StoryContainer } from '@/features/story/StoryContainer';
import React from 'react';

const Page = async ({ params, searchParams }: { params: Promise<{ userName: string; storyId: string }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const { userName } = await params;
  const { lot } = await searchParams;
  return <StoryContainer>{!lot ? <OnePersonStory userName={userName} /> : <PeopleStory userName={userName} />}</StoryContainer>;
};
export default Page;
