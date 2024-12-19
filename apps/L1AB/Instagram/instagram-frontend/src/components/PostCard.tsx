'use client';
import { ChevronLeft, ChevronRight, EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import PostCardCommentSection from './PostCardCommentSection';
import PostCardLikeSection from './PostCardLikeSection';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserContext } from './providers';

type PropsType = {
  userName: string;
  images: string[];
  profilePicture: string;
  caption: string;
  keyy: number;
  postId: string;
};

const PostCard = ({ userName, images, profilePicture, caption, keyy, postId }: PropsType) => {
  const [userId, setUserId] = useState<string | null>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { user }: any = useContext(UserContext);

  const prev = () => {
    setCurrentImageIndex((curr) => curr - 1);
  };

  const next = () => {
    setCurrentImageIndex((curr) => curr + 1);
  };

  useEffect(() => {
    setUserId(user._id);
  }, []);

  return (
    <div data-testid={`NewsFeedPostCard-${keyy}`} className="border-b">
      <div className="w-full mx-auto p-2">
        <div className="flex justify-between items-center">
          <Link href={`/profile?type=posts&username=${userName}`} className="flex gap-2 items-center">
            <Avatar className="w-10 h-10 flex items-center justify-center">
              <AvatarImage src={profilePicture} alt={userName} className="object-cover" />
              <AvatarFallback className="uppercase text-[#ccc]">{userName?.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div>{userName}</div>
            {/* <div className="text-[#71717A]">5h</div> */}
          </Link>
          <div>
            <EllipsisVertical className="w-4 h-4" />
          </div>
        </div>
        <div className="pt-3">
          <div className="h-[400px] w-full border relative rounded-md flex max-w-lg overflow-hidden">
            <div className="flex transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${(currentImageIndex * 100) / images.length}%)` }}>
              {images.map((image, i) => {
                return (
                  <div key={i} className="relative w-[528px] overflow-hidden">
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
