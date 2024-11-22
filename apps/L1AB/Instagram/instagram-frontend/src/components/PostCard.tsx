'use client';
import { useCreateCommentMutation, useCreateLikeMutation, useGetCommentsByPostIdQuery, useGetLikesByPostIdQuery } from '@/generated';
import { ChevronLeft, ChevronRight, EllipsisVertical, Smile } from 'lucide-react';
import { Heart } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { Bookmark } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type PropsType = {
  userName: string;
  images: string[];
  profilePicture: string;
  caption: string;
  keyy: number;
  postId: string;
};

const PostCard = ({ userName, images, profilePicture, caption, keyy, postId }: PropsType) => {
  const [comment, setComment] = useState('');
  const [userId, setUserId] = useState<string | null>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data, refetch } = useGetCommentsByPostIdQuery({
    variables: { postId: postId },
    onError: (error) => {
      console.log(error);
    },
  });
  console.log(userId);

  const [createComment] = useCreateCommentMutation();

  const [createLike] = useCreateLikeMutation();

  const { data: likedata, refetch: likesRefetch } = useGetLikesByPostIdQuery({ variables: { postId: postId } });

  const commentsData = data?.getCommentsByPostId;

  const likesData = likedata?.getLikesByPostId;
  const isLiked = userId ? likesData?.some((like) => like.userId === userId) : false;

  const handleComment = async (postId: string) => {
    if (!userId) return;

    await createComment({
      variables: {
        input: {
          comment: comment,
          postId: postId,
          userId: userId,
        },
      },
    });
    await refetch();
    setComment('');
  };
  const handeLike = async () => {
    console.log({
      variables: {
        userId: userId,
        postId: postId,
      },
    });

    if (!userId) return;
    await createLike({
      variables: {
        userId: userId,
        postId: postId,
      },
    });

    await likesRefetch();
  };

  const prev = () => {
    setCurrentImageIndex((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrentImageIndex((curr) => (curr === images.length - 1 ? 0 : curr + 1));
  };

  useEffect(() => {
    const id = localStorage.getItem('userId');
    setUserId(id);
  }, []);

  return (
    <div data-testid={`NewsFeedPostCard-${keyy}`}>
      <div className="w-full mx-auto p-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Avatar className="w-10 h-10 flex items-center justify-center">
              <AvatarImage src={profilePicture} alt={userName} className="object-cover" />
              <AvatarFallback className="uppercase text-[#ccc]">{userName?.slice(0, 1)}</AvatarFallback>
            </Avatar>
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
                <Heart data-testid="likeButton" onClick={handeLike} className={`cursor-pointer ${isLiked ? 'text-[#ff0000]' : ''}`} fill={`${isLiked ? 'red' : 'white'}`} />
                <div>{likesData?.length}</div>
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
          <div className="text-[#71717A]">
            <div>View all {commentsData?.length} comments</div>
            <div className="flex justify-between pt-2 items-center">
              <input data-testid="commentInput" value={comment} onChange={(e) => setComment(e.target.value)} className="w-3/4 focus:outline-none" placeholder="Add comment ..." />
              <div
                onClick={() => {
                  handleComment(postId);
                }}
                data-testid="handleComment"
                className={`text-blue-500 font-semibold ${comment ? 'block' : 'hidden'} cursor-pointer`}
              >
                Post
              </div>
              <Smile className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
