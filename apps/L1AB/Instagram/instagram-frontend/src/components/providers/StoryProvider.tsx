'use client';

import { Story, useGetAllStoriesQuery, User } from '@/generated';
import { createContext, PropsWithChildren, useContext } from 'react';

type StoryContextType = {
  groupedStories: GroupedStories | null;
};

type GroupedStories = {
  [userId: string]: {
    userId: User;
    stories: Story[];
  };
};

const StoryContext = createContext<StoryContextType>({ groupedStories: null });

export const StoryProvider = ({ children }: PropsWithChildren) => {
  const { data } = useGetAllStoriesQuery();
  const stories = data?.getAllStories as Story[] | undefined;

  const groupedStories = stories?.reduce((acc, story) => {
    const userId = story?.userId._id;

    if (!acc[userId]) {
      acc[userId] = {
        userId: story?.userId,
        stories: [],
      };
    }
    acc[userId].stories.push(story as unknown as Story);

    return acc;
  }, {} as GroupedStories);

  return <StoryContext.Provider value={{ groupedStories: groupedStories as GroupedStories }}>{children}</StoryContext.Provider>;
};

export const useStory = () => useContext(StoryContext);
