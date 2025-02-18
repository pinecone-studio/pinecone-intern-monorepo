'use client';
import { useGetOneStoryQuery } from '@/generated';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { imageUrlOptimizer } from '../../components/utils/image-url-optimizer';
import Image from 'next/image';
export const OnePersonStory = ({ userName }: { userName: string }) => {
  const { data } = useGetOneStoryQuery({
    variables: {
      userName: userName,
    },
    onError: (error) => {
      console.log('error', error);
    },
  });
  const firstStory = data?.getOneStory[0].items[0];
  return (
    <div className="w-full h-full flex items-center justify-center gap-2" data-testid="current-story">
      <button
        // onClick={handlePrevious}
        data-testid="previous-button"
        className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
        // disabled={currentIndex === 0}
      >
        <ChevronLeft />
      </button>
      <div className="w-[522px] h-[90%]  rounded-xl overflow-hidden relative bg-white" data-testid="story-content">
        <div className={`w-full h-full relative`} data-testid="story-background" />
        <Image src={imageUrlOptimizer(firstStory?.storyImage || '/images/profilePic.png')} fill alt="image" className="object-cover object-center" />
      </div>
      <button
        // onClick={handleNext}
        data-testid="next-button"
        className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
        // disabled={currentIndex === stories.length - 1}
      >
        <ChevronRight />
      </button>
    </div>
  );
};
