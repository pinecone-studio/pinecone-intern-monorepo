import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useCreateCommentMutation, useGetCommentsByPostIdQuery } from '@/generated';
import { Bookmark, ChevronLeft, ChevronRight, Heart, MessageCircle, MoreVertical, Send, Smile } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import HeartIcon from './assets/icons/HeartIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

type PropsType = {
  postimages: string[];
  postcaption: string;
  userName: string;
  userProfile: string;
  postId: string;
  userId: string;
};
const PostDetail = ({ postimages, postcaption, userProfile, userName, postId, userId }: PropsType) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comments, setComments] = useState('');

  const prev = () => {
    setCurrentImageIndex((curr) => (curr === 0 ? postimages.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrentImageIndex((curr) => (curr === postimages.length - 1 ? 0 : curr + 1));
  };

  const { data, refetch } = useGetCommentsByPostIdQuery({ variables: { postId: postId } });
  const commentsData = data?.getCommentsByPostId;
  const [createComment] = useCreateCommentMutation();

  const handleComment = async (postId: string) => {
    if (!userId) return;
    await createComment({
      variables: {
        input: {
          comment: comments,
          postId: postId,
          userId: userId,
        },
      },
    });
    await refetch();
    setComments('');
  };
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
              <button className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white" onClick={prev} data-testid="PrevButton">
                <ChevronLeft size={20} />
              </button>
              <button className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white" onClick={next} data-testid="NextButton">
                <ChevronRight size={20} />
              </button>
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
                <div className="flex gap-2 items-center w-[336px] h-[40px]">
                  <div className="w-10 h-10 rounded-full border overflow-hidden relative">
                    <Image className="" alt="no picture" src={userProfile} fill objectFit="cover" />
                  </div>
                  <div>
                    <div className="flex gap-2">
                      <div className="font-semibold">{userName}</div>
                      <div>{postcaption}</div>
                    </div>
                    <div className="text-sm text-[#71717A]">1d</div>
                  </div>
                </div>
                <div className="flex flex-col gap-6 mt-2 h-[200px] overflow-auto">
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
                                  <div className="text-xs text-[#71717A]">1d</div>
                                  {/* <div className="text-sm text-[#71717A]">{comment.likesCount}likes</div> */}
                                  <div className="text-xs text-[#71717A]">Reply</div>
                                </div>
                              </div>
                            </Link>
                          </div>
                          <HeartIcon />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between p-4 border-t">
                <div className="flex gap-4">
                  <Heart />
                  <MessageCircle />
                  <Send />
                </div>
                <Bookmark />
              </div>
              <p className="text-xs text-[#71717A] px-4 pb-3">1 day ago</p>
              <div className="flex justify-between p-4  items-center border-t">
                <Smile size={24} />
                <input data-testid="commentInput" value={comments} onChange={(e) => setComments(e.target.value)} className="w-3/4 focus:outline-none" placeholder="Add comment ..." />
                <div
                  data-testid="handleComment"
                  onClick={() => {
                    handleComment(postId);
                  }}
                  className={`text-blue-500 font-semibold ${commentsData ? 'block' : 'hidden'} cursor-pointer`}
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
