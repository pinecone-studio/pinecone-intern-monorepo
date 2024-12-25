/* eslint-disable complexity */
'use client';
import { ChevronLeft, ChevronRight, EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PostCardCommentSection from './PostCardCommentSection';
import PostCardLikeSection from './PostCardLikeSection';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useStory, useUser } from './providers';
import { formatDistanceToNow } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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

type PropsType = {
  userName: string;
  images: string[];
  profilePicture: string;
  caption: string;
  postId: string;
  createdAt: string;
  postOwnerId: string;
  deletePost: (_id: string) => void;
};

const PostCard = ({ userName, images, profilePicture, caption, postId, createdAt, postOwnerId, deletePost }: PropsType) => {
  const [userId, setUserId] = useState<string | null>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { user }: any = useUser();

  const { groupedStories } = useStory();
  const userStory = Object.keys(groupedStories || {}).find((item) => item === postOwnerId);

  const prev = () => {
    setCurrentImageIndex((curr) => curr - 1);
  };

  const next = () => {
    setCurrentImageIndex((curr) => curr + 1);
  };

  useEffect(() => {
    if (user) {
      setUserId(user._id);
    }
  }, []);

  return (
    <div data-testid={`NewsFeedPostCard-${postId}`} className="border-b">
      <div className="w-full mx-auto p-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            {' '}
            <div className={`${userStory ? 'bg-gradient-to-tr from-[#FFDC80] via-[#fd1d1d] to-[#833ab4]' : 'bg-green'}  w-[44px] h-[44px] rounded-full flex items-center justify-center `}>
              <Link href={userStory ? `/story?userId=${postOwnerId}` : `/profile?type=posts&username=${userName}`}>
                <Avatar className="w-10 h-10 flex items-center justify-center border-white border-2">
                  <AvatarImage src={profilePicture} alt={userName} className="object-cover" />
                  <AvatarFallback className="uppercase text-[#ccc]">{userName?.slice(0, 1)}</AvatarFallback>
                </Avatar>
              </Link>
            </div>
            <Link href={`/profile?type=posts&username=${userName}`} className="flex gap-2">
              <div>{userName}</div>
              <div className="text-[#71717A]"> {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</div>
            </Link>
          </div>
          <div>
            {userId === postOwnerId ? (
              <Popover>
                <PopoverTrigger>
                  <EllipsisVertical data-testid={`deleteButton-${postId}`} className="w-4 h-4" />
                </PopoverTrigger>
                <PopoverContent className="w-fit py-2 px-4 cursor-pointer hover:text-red-500">
                  <AlertDialog>
                    <AlertDialogTrigger data-testid={`delete-${postId}`}>Delete</AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone. This will permanently delete your post.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction data-testid={`deletePost-${postId}`} onClick={() => deletePost(postId)}>
                          Yes
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </PopoverContent>
              </Popover>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="pt-3">
          <div className="h-[400px] w-full border relative rounded-md flex max-w-lg overflow-hidden">
            <div className="flex transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${(currentImageIndex * 100) / images.length}%)` }}>
              {images.map((image, i) => {
                return (
                  <div key={i + Math.random()} className="relative w-[528px] overflow-hidden">
                    <Image className="object-cover" alt={`${i}`} src={image} fill />
                  </div>
                );
              })}
            </div>
            {currentImageIndex !== 0 && (
              <button className="absolute left-2 top-[48%] p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white" onClick={prev} data-testid="PrevButton">
                <ChevronLeft size={20} />
              </button>
            )}
            {currentImageIndex !== images.length - 1 && (
              <button className="absolute right-2 top-[48%] p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white" onClick={next} data-testid="NextButton">
                <ChevronRight size={20} />
              </button>
            )}
            <div className="absolute bottom-4 right-0 left-0">
              <div className="flex items-center justify-center gap-1">
                {images.map((_, i) => (
                  <div key={i} className={`transition-all w-2 h-2 bg-white rounded-full ${currentImageIndex === i ? 'p-0' : 'bg-opacity-50'}`}></div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <PostCardLikeSection images={images} caption={caption} profilePicture={profilePicture} userName={userName} postId={postId} userId={userId || ''} />
          </div>
        </div>
        <div className="py-2 flex flex-col gap-2">
          <div>
            <span className="font-semibold h-fit"> {userName}</span> {caption}
          </div>
          <PostCardCommentSection images={images} caption={caption} profilePicture={profilePicture} userName={userName} postId={postId} userId={userId || ''} />
        </div>
      </div>
    </div>
  );
};
export default PostCard;
