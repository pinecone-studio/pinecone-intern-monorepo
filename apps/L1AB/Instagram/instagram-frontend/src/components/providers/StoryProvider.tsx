'use client';

import { Story, useGetAllStoriesQuery } from '@/generated';
import { createContext, PropsWithChildren, useContext } from 'react';

type StoryContextType = {
  groupStories: [Story[]] | null;
};

const StoryContext = createContext<StoryContextType>({ groupStories: null });

export const StoryProvider = ({ children }: PropsWithChildren) => {
  const { data } = useGetAllStoriesQuery();
  const groupStories = data?.getAllStories;

  return <StoryContext.Provider value={{ groupStories: groupStories as [Story[]] }}>{children}</StoryContext.Provider>;
};

export const useStory = () => useContext(StoryContext);
