'use client';

import { createContext, PropsWithChildren, useContext } from 'react';
type StoryContextType = {
  handleNext: () => void;
};
const StoryContext = createContext<StoryContextType>({} as StoryContextType);
export const StoryProvider = ({ children }: PropsWithChildren) => {
  //   const [oneStoryIndex, setOneStoryIndex] = useState(0);
  const handleNext = () => {
    console.log('hi');
  };
  //   const handlePrevious = () => {};
  //   const onCompleted = () => {};
  return <StoryContext.Provider value={{ handleNext }}>{children}</StoryContext.Provider>;
};
export const useStory = () => {
  const context = useContext(StoryContext);
  return context;
};
