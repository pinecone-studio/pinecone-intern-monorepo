import { PostLike } from '../../components/home/main/PostLike';
import { useCreatePostLikeMutation, useDeletePostLikeMutation, UserPostType } from '@/generated';
import { useRef, useState } from 'react';
import { quantityConverter } from '@/components/utils/quantity-converter';
import { useCache } from '@/components/providers/CacheProvider';
import LikeModal from '@/components/home-post/LikeModal';
import { Separator } from '@radix-ui/react-separator';
import { MessageCircle } from 'lucide-react';
import CreateComment from './comment/CreateComment';

export const PostLikeModal = ({ post }: { post: UserPostType }) => {
  const [createPostLike] = useCreatePostLikeMutation();
  const [deleteLike] = useDeletePostLikeMutation();
  const [liked, setLiked] = useState(post.hasLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const { cacheLikePost, cacheUnlikePost } = useCache();
  const addInputRef = useRef<HTMLInputElement>(null);
  const handleMessageFocus = () => {
    addInputRef.current?.focus();
  };
  const handleClickLike = async () => {
    setLiked((prev) => !prev);
    try {
      if (liked) {
        setLikeCount((pre) => pre - 1);
        await deleteLike({
          variables: {
            input: {
              postId: post._id,
              ownerUserId: post.userId,
            },
          },
        });
        cacheUnlikePost({ postId: post._id, likeCount: post.likeCount - 1, hasLiked: false });
      } else {
        setLikeCount((pre) => pre + 1);
        await createPostLike({
          variables: {
            input: {
              postId: post._id,
              ownerUserId: post.userId,
            },
          },
        });
        cacheLikePost({ postId: post._id, likeCount: post.likeCount + 1, hasLiked: true });
      }
    } catch (error) {
      setLiked(liked);
      setLikeCount(likeCount);
    }
  };
  return (
    <>
      <div className=" " data-testid="post-actions">
        <div className="flex flex-col gap-2 ">
          <Separator className="border-b w-full" />
          <div className="flex justify-between p-5 items-center ">
            <div className="flex gap-5 justify-center items-center">
              <PostLike liked={liked} handleClickLike={handleClickLike} />

              <LikeModal postId={post._id}>
                <p data-testid="like-count">{quantityConverter({ quantity: likeCount, text: 'like' })}</p>
              </LikeModal>
            </div>
            <div>
              <MessageCircle className="hover:text-gray-400 cursor-pointer" onClick={handleMessageFocus} />
            </div>
          </div>

          <Separator className="border-b w-full" />

          <CreateComment post={post} ref={addInputRef} />
        </div>
      </div>
    </>
  );
};
