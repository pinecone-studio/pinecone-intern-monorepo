'use client';
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';

type StoryType = {
  id: number;
  username: string;
  time: string;
  gradient: string;
  views: string;
};

type StoryProps = {
  stories: StoryType[];
};

export const Story: React.FC<StoryProps> = ({ stories }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(stories.length - 1, prev + 1));
  };
  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };
  return (
    <div className="w-screen h-screen bg-[#18181B] p-6" data-testid="story-container">
      <div className="max-w-[1400px] mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4" data-testid="story-header">
          <div className="text-white text-xl font-semibold" data-testid="story-title">
            Instagram
          </div>
          <button className="text-white hover:opacity-80" data-testid="close-button">
            <X size={24} />
          </button>
        </div>

        {/* Stories Viewer */}
        <div className="flex-1 flex items-center justify-center gap-14 px-4" data-testid="story-viewer">
          {/* Navigation */}
          <div className="flex items-center gap-2">
            {stories.map((story, index) => {
              const isCurrent = index === currentIndex;
              const isAdjacent = Math.abs(index - currentIndex) === 1;

              if (!isCurrent && !isAdjacent) return null;

              if (isCurrent) {
                return (
                  <div key={story.id} className="flex items-center gap-2" data-testid="current-story">
                    <button
                      onClick={handlePrevious}
                      data-testid="previous-button"
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
                      disabled={currentIndex === 0}
                    >
                      <ChevronLeft />
                    </button>

                    <div className="w-[522px] h-[926px] rounded-xl overflow-hidden relative" data-testid="story-content">
                      <div className={`w-full h-full bg-gradient-to-br ${story.gradient}`} data-testid="story-background" />
                      <div className="absolute top-4 left-4 flex items-center gap-3" data-testid="story-header-info">
                        <div className="w-8 h-8 rounded-full bg-white/20" />
                        <div className="flex items-center gap-2">
                          <span className="text-white text-sm font-medium" data-testid="story-username">
                            {story.username}
                          </span>
                          <span className="text-white/60 text-sm" data-testid="story-time">
                            {story.time}
                          </span>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 flex items-center gap-1" data-testid="story-footer-info">
                        <div className="w-1 h-1 bg-white rounded-full" />
                        <span className="text-white text-sm" data-testid="story-views">
                          {story.views}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleNext}
                      data-testid="next-button"
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
                      disabled={currentIndex === stories.length - 1}
                    >
                      <ChevronRight />
                    </button>
                  </div>
                );
              }

              return (
                <div key={story.id} className="w-[245px] h-[433px] rounded-xl overflow-hidden" data-testid={`story-thumbnail-${index}`}>
                  <div className={`w-full h-full bg-gradient-to-br ${story.gradient} opacity-50`}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-white/20" />
                        <p className="text-white">{story.username}</p>
                        <p className="text-gray-400">{story.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
