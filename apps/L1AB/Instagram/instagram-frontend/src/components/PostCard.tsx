'use client';
import { ChevronLeft, ChevronRight, EllipsisVertical } from 'lucide-react';
import { Heart } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { Bookmark } from 'lucide-react';
// import { Smile } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type PropsType = {
  userName: string;
  likeCount: number;
  images: string[];
  profilePicture: string;
  caption: string;
  keyy: number;
};

const PostCard = ({ userName, likeCount, images, profilePicture, caption, keyy }: PropsType) => {
  // const [comment, setComment] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prev = () => {
    setCurrentImageIndex((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrentImageIndex((curr) => (curr === images.length - 1 ? 0 : curr + 1));
  };

  return (
    <div data-testid={`NewsFeedPostCard-${keyy}`}>
      <div className="w-full mx-auto p-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 rounded-full border overflow-hidden relative">
              <Image className="" alt="no picture" src={profilePicture} fill />
            </div>
            <div>{userName}</div>
            <div className="text-[#71717A]">5h</div>
          </div>
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
                    <Image className="object-cover" alt="no" src={image} fill />
                  </div>
                );
              })}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white" onClick={prev} data-testid="PrevButton">
                <ChevronLeft size={20} />
              </button>
              <button className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white" onClick={next} data-testid="NextButton">
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="absolute bottom-4 right-0 left-0">
              <div className="flex items-center justify-center gap-2">
                {images.map((_, i) => (
                  <div key={i} className={`transition-all w-3 h-3 bg-white rounded-full ${currentImageIndex === i ? 'p-2' : 'bg-opacity-50'}`}></div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-between pt-3">
            <div className="flex gap-4">
              <div className="flex gap-1">
                <Heart />
                <div>{likeCount}</div>
              </div>
              <MessageCircle />
            </div>
            <Bookmark />
          </div>
        </div>
        <div className="py-2 flex flex-col gap-2">
          <div>
            <span className="font-semibold h-fit"> {userName}</span> {caption}
          </div>
          {/* <div className="text-[#71717A]">
            <div>View all {commentCount} comments</div>
            <div className="flex justify-between pt-2 items-center">
              <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" className="w-3/4 focus:outline-none " placeholder="Add a comment ..." />
              <div className={`text-blue-500 font-semibold ${comment ? 'block' : 'hidden'}`}>Post</div>
              <Smile className="h-4 w-4" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default PostCard;
