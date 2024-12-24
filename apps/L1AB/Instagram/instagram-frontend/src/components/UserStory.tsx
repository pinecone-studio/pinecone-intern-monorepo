'use client';
import Image from 'next/image';
import { useStory, useUser } from './providers';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Story, useDeleteStoryMutation, useGetAllStoriesQuery } from '@/generated';
import { formatDistanceToNow } from 'date-fns';
import { IoIosMore } from 'react-icons/io';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
  const { user } = useUser();
  console.log(userId);
  console.log(user);

  const userStoriesGroup = groupedStories![userId];

  console.log(userStoriesGroup.stories.length);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [deleteStory] = useDeleteStoryMutation();
  const { refetch } = useGetAllStoriesQuery({ variables: { followerId: user?._id } });
  const router = useRouter();
  const handleDeleteStory = async () => {
    const storyId = userStoriesGroup.stories[currentImageIndex]._id;

    await deleteStory({
      variables: {
        input: {
          _id: storyId,
          userId: user._id,
        },
      },
    });
    refetch();
    router.push('/home');
  };

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

  return (
    <div
      className="relative rounded-md flex dark:text-white "
      style={{
        transition: '800ms',
        transform: mainUserStory === userId ? 'scale(1)' : 'scale(0.5)',
      }}
    >
      <div className="overflow-hidden w-full h-[80vh] relative">
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
            <div className="text-white"> {formatDistanceToNow(new Date(userStoriesGroup.stories[currentImageIndex]?.createdAt), { addSuffix: true })}</div>
          </div>{' '}
        </div>
        <div className={`${user._id === userId ? 'absolute z-10 top-12 right-12' : 'hidden'} `}>
          <AlertDialog>
            <Popover>
              <PopoverTrigger>
                <IoIosMore className="text-white" data-testid="deleteTrigger" />
              </PopoverTrigger>
              <AlertDialogTrigger>
                <PopoverContent className="text-red-500 w-30 h-10 flex items-center mr-20 text-[14px] cursor-pointer" data-testid="deleteStory">
                  Delete story{' '}
                </PopoverContent>{' '}
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[350px]">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete story?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You can restore unarchived stories for 24 hours, or 30 days for archived stories, from Recently deleted in Your activity. After that, it will be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="text-red-500 bg-white" data-testid="deleteButton" onClick={handleDeleteStory}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </Popover>
          </AlertDialog>
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
