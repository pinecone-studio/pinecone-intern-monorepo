'use client';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export const StoryContainer = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div className="w-screen h-screen bg-[#18181B] p-6" data-testid="story-container">
      <div className="max-w-[1400px] mx-auto h-full flex flex-col">
        <div className="flex justify-between items-center p-4" data-testid="story-header">
          <div className="text-white text-xl font-semibold" data-testid="story-title">
            Instagram
          </div>
          <button className="text-white hover:opacity-80" data-testid="close-button">
            <X
              size={24}
              onClick={() => {
                router.back();
              }}
            />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
