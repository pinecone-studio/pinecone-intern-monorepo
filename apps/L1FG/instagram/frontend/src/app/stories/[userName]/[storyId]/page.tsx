import { OnePersonStory } from '@/features/story/OnePersonStory';
import { StoryContainer } from '@/features/story/StoryContainer';
import React from 'react';

const Page = async ({ params }: { params: Promise<{ userName: string; storyId: string }> }) => {
  const { userName } = await params;
  return (
    <StoryContainer>
      <OnePersonStory userName={userName} />
    </StoryContainer>
  );
};
export default Page;
