"use client";
import { createContext, useContext, useState } from 'react';

type PostContextType = {
  postStep: 'idle' | 'select-image' | 'add-caption' | 'preview';
  setPostStep: (_step: 'idle' | 'select-image' | 'add-caption' | 'preview') => void;
  handlePostClick: () => void;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [postStep, setPostStep] = useState<'idle' | 'select-image' | 'add-caption' | 'preview'>('idle');
  console.log(postStep, "CHECKKK in Context");
  const handlePostClick = () => {
    setPostStep('select-image');
  };

  return (
    <PostContext.Provider value={{ postStep, setPostStep, handlePostClick }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePost() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
}