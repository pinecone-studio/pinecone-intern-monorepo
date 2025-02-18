import { Bookmark, MessageCircle } from 'lucide-react';
import { PostLike } from '../../components/home/main/PostLike';
import { PostsEdge, useCreatePostLikeMutation, useDeletePostLikeMutation } from '@/generated';
import { useState } from 'react';
import { quantityConverter } from '@/components/utils/quantity-converter';
import { useCache } from '@/components/providers/CacheProvider';
import PostModal from '@/components/profile/profilePost/PostModal';
import LikeModal from '@/components/home-post/LikeModal';

export const PostLikeSection = ({ post }: { post: PostsEdge }) => {
  const [createPostLike] = useCreatePostLikeMutation();
  const [deleteLike] = useDeletePostLikeMutation();
  const [liked, setLiked] = useState(post.node.hasLiked);
  const [likeCount, setLikeCount] = useState(post.node.likeCount);
  const { cacheLikePost, cacheUnlikePost } = useCache();
  const handleClickLike = async () => {
    setLiked((prev) => !prev);
    try {
      if (liked) {
        setLikeCount((pre) => pre - 1);
        await deleteLike({
          variables: {
            input: {
              postId: post.node._id,
              ownerUserId: post.node.userId,
            },
          },
        });
        cacheUnlikePost({ postId: post.node._id, likeCount: post.node.likeCount - 1, hasLiked: false });
      } else {
        setLikeCount((pre) => pre + 1);
        await createPostLike({
          variables: {
            input: {
              postId: post.node._id,
              ownerUserId: post.node.userId,
            },
          },
        });
        cacheLikePost({ postId: post.node._id, likeCount: post.node.likeCount + 1, hasLiked: true });
      }
    } catch (error) {
      setLiked(liked);
      setLikeCount(likeCount);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between px-1 py-3 text-xl" data-testid="post-actions">
        <div className="flex gap-3">
          <PostLike liked={liked} handleClickLike={handleClickLike} />
          <PostModal post={post.node}>
            <MessageCircle data-testid="comment-icon" className="cursor-pointer" />
          </PostModal>
        </div>
        <Bookmark data-testid="bookmark-icon" className="cursor-pointer" />
      </div>
      <div>
        <LikeModal userId={post.node.user._id}>
          <p data-testid="like-count">{quantityConverter({ quantity: likeCount, text: 'like' })}</p>
        </LikeModal>
      </div>
    </>
  );
};
