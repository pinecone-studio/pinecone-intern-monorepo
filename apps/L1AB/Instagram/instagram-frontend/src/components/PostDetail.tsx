/* eslint-disable max-lines */
/* eslint-disable complexity */
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useCreateCommentMutation, useCreateLikeMutation, useCreateSaveMutation, useGetCommentsByPostIdQuery, useGetLikesByPostIdQuery, useGetSavedByPostIdQuery } from '@/generated';
import { ChevronLeft, ChevronRight, MessageCircle, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { LikeButton, SaveButton } from './PostCardLikeSection';
type PropsType = {
  postimages: string[];
  postcaption: string;
  userName: string;
  userProfile: string;
  postId: string;
  userId: string;
  createdAt: string;
};
const PostDetail = ({ postimages, postcaption, userProfile, userName, postId, userId, createdAt }: PropsType) => {
  const { data: likedata, refetch: likesRefetch } = useGetLikesByPostIdQuery({ variables: { postId } });
  const { data: savedData } = useGetSavedByPostIdQuery({ variables: { postId } });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comments, setComments] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const likesData = likedata?.getLikesByPostId || [];
  const isLiked = userId ? likesData?.some((like) => like.userId === userId) : false;
  const savedByPostId = savedData?.getSavedByPostId;
  const prev = () => {
    setCurrentImageIndex((curr) => curr - 1);
  };
  const next = () => {
    setCurrentImageIndex((curr) => curr + 1);
  };
  const { data, refetch } = useGetCommentsByPostIdQuery({ variables: { postId: postId } });
  const commentsData = data?.getCommentsByPostId;
  const [createComment] = useCreateCommentMutation();
  const [createLike] = useCreateLikeMutation();
  const [createSave] = useCreateSaveMutation();
  const handleLike = async () => {
    await createLike({ variables: { userId, postId } });
    await likesRefetch();
  };
  const handleComment = async (postId: string) => {
    await createComment({
      variables: {
        input: { comment: comments, postId: postId, userId: userId },
      },
    });
    await refetch();
    setComments('');
  };
  const handleSave = async () => {
    await createSave({ variables: { userId, postId } });
    setIsSaved(!isSaved);
  };
  useEffect(() => {
    if (savedByPostId) {
      const saved = savedByPostId.postId?._id === postId && savedByPostId.userId?._id === userId;
      setIsSaved(saved);
    } else {
      setIsSaved(false);
    }
  }, [savedByPostId, postId, userId]);

  return (
    <Dialog>
      <DialogTrigger>
        <MessageCircle data-testid="MessageCircleIcon" />
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] w-fit bg-transparent border-none p-0">
        <div className="relative flex w-full h-[74vh] bg-background rounded-md">
          <div className="h-full w-fit relative flex max-w-lg overflow-hidden">
            <div className="flex transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${(currentImageIndex * 100) / postimages.length}%)` }}>
              {postimages.map((image, i) => {
                return (
                  <div key={i} className="relative h-full w-[528px] overflow-hidden">
                    <Image objectFit="contain" alt="no" src={image} fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  </div>
                );
              })}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
              {currentImageIndex !== 0 && (
                <button className="absolute left-2 top-[48%] p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white" onClick={prev} data-testid="PrevButton">
                  <ChevronLeft size={20} />
                </button>
              )}
              {currentImageIndex !== postimages.length - 1 && (
                <button className="absolute right-2 top-[48%] p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white" onClick={next} data-testid="NextButton">
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          </div>
          <div className="flex w-[456px] h-full gap-4 flex-col justify-between">
            <div>
              <div className="flex items-center justify-between px-4 py-[12px]">
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 rounded-full border overflow-hidden relative">
                    <Image alt="no picture" src={userProfile} fill objectFit="cover" />
                  </div>
                  <div className="font-semibold">{userName}</div>
                </div>
                <MoreVertical className="w-4 h-4 items-end" />
              </div>
              <div className="flex flex-col gap-4 border-t p-4">
                <div className="flex gap-2 items-center w-full h-[40px]">
                  <div className="w-10 h-10 px-4 rounded-full border overflow-hidden relative">
                    <Image className="" alt="no picture" src={userProfile} fill objectFit="cover" />
                  </div>
                  <div>
                    <div className="flex gap-2">
                      <div className="font-semibold">{userName}</div>
                      <div>{postcaption}</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6 mt-2 h-fit py-2 overflow-auto">
                  {commentsData &&
                    commentsData.map((comment, i) => {
                      return (
                        <div key={i} className="flex gap-2 items-center w-[336px] h-[40px]">
                          <div className="flex gap-2">
                            <Link href={`/profile?type=posts&username=${comment?.userId?.username}`} className="flex gap-2 items-center">
                              <Avatar className="w-10 h-10 flex items-center justify-center">
                                <AvatarImage src={comment?.userId?.profilePicture} alt={userName} className="object-cover" />
                                <AvatarFallback className="uppercase text-[#ccc]">{userName?.slice(0, 1)}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col gap-2 w-[336px] h-[40px]">
                                <div className="flex gap-2">
                                  <div className="font-semibold">{comment?.userId?.username}</div>
                                  <div>{comment?.comment}</div>
                                </div>
                                <div className="flex gap-3">
                                  <div className="text-xs text-[#71717A]">{formatDistanceToNow(comment.createdAt)}</div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between p-4 border-t">
                <div className="flex gap-4 ">
                  <LikeButton isLiked={isLiked} handleLike={handleLike} />
                  <MessageCircle className="hover:text-[#71717A]" />
                </div>
                <SaveButton data-testid="handlesave" handleSave={handleSave} isSaved={isSaved} />
              </div>
              <div className="text-sm px-4 pb-4 font-semibold">{likesData.length} likes</div>
              <div className="text-sm text-[#71717A] px-4 pb-4">{formatDistanceToNow(createdAt)} ago</div>
              <div className="flex justify-between p-4  items-center border-t">
                <input
                  data-testid="commentInput"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-3/4 focus:outline-none dark:bg-[hsl(var(--background-main))] "
                  placeholder="Add comment ..."
                />
                <div
                  data-testid="handleComment"
                  onClick={() => {
                    handleComment(postId);
                  }}
                  className={`text-blue-500 font-semibold ${comments ? 'block' : 'hidden'} cursor-pointer`}
                >
                  Post
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default PostDetail;
