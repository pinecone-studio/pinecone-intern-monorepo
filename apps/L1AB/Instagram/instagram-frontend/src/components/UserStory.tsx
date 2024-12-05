'use client';
import Image from 'next/image';
import { useStory } from './providers';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Story } from '@/generated';
import { formatDistanceToNow } from 'date-fns';

type PropsType = {
  userId: string;
  stories: Story[];
  username: string;
  profilePicture: string;
  prevUser: () => void;
  nextUser: () => void;
  mainUserStory: string;
};

export const UserStory = ({ userId, stories, username, profilePicture, prevUser, nextUser, mainUserStory }: PropsType) => {
  const { groupedStories } = useStory();
  if (!groupedStories) return <p>Loading...</p>;
  const userStoriesGroup = groupedStories[userId];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prev = async () => {
    if (currentImageIndex === 0) {
      await prevUser();
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const next = async () => {
    if (currentImageIndex === userStoriesGroup.stories.length - 1) {
      await nextUser();
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const date = userStoriesGroup.stories[currentImageIndex]?.createdAt;

  return (
    <div
      className="relative rounded-md flex "
      style={{
        transition: '800ms',
        transform: mainUserStory === userId ? 'scale(1)' : 'scale(0.5)',
      }}
    >
      <div className="overflow-hidden w-full pt-[190%] relative">
        <div className="absolute top-0 left-0 h-full w-full">
          <div
            className="flex h-full"
            style={{
              width: stories.length * 100 + '%',
              transition: '300ms',
              transform: `translateX(-${(currentImageIndex * 100) / userStoriesGroup.stories.length}%) `,
            }}
          >
            {stories.map((images, index) => (
              <div className="flex-1 h-full relative rounded-lg overflow-hidden" key={index}>
                <Image src={images.image} alt={`Story image ${index + 1}`} fill objectFit="cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute left-5 top-1 p-3 w-[93%] h-full">
          <div className="flex gap-2 w-full">
            {Array.from({ length: userStoriesGroup.stories.length }).map((_, i) => (
              <div className="w-full" key={i}>
                <div className={`${currentImageIndex === i ? 'bg-white' : 'bg-[#8C8C8C]'} flex gap-1 p-0.5 rounded-xl  ${mainUserStory === userId ? '' : 'hidden'}`}></div>
              </div>
            ))}
          </div>

          <div className={`flex gap-3 mt-4 w-full ${mainUserStory === userId ? ' items-center' : 'flex-col justify-center items-center h-full'}`}>
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image fill alt="" src={profilePicture} objectFit="cover" />
            </div>
            <h1 className="text-white">{username}</h1>
            <div className="text-white"> {date ? formatDistanceToNow(new Date(date), { addSuffix: true }) : 'Just now'}</div>
          </div>
        </div>
      </div>

      <div className={` ${mainUserStory === userStoriesGroup.userId._id ? 'absolute inset-0 flex items-center justify-between ' : 'hidden'}`}>
        <button className="p-2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white -left-11 absolute" onClick={prev} data-testid="PrevButton">
          <ChevronLeft size={20} />
        </button>
        <button className="p-2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white absolute -right-11" onClick={next} data-testid="NextButton">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
