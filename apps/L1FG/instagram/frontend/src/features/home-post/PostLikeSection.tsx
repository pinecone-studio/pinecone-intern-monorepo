import { Bookmark, MessageCircle } from 'lucide-react';
import { PostLike } from '../../components/home/main/PostLike';
import { PostsEdge, useCreatePostLikeMutation, useDeletePostLikeMutation } from '@/generated';
import { useState } from 'react';

export const PostLikeSection = ({ post }: { post: PostsEdge }) => {
  const [createPostLike] = useCreatePostLikeMutation();
  const [deleteLike] = useDeletePostLikeMutation();
  const [liked, setLiked] = useState(post.node.hasLiked);
  const [likeCount, setLikeCount] = useState(post.node.likeCount);
  const handleClickLike = async () => {
    setLiked((prev) => !prev);
    try {
      if (liked) {
        setLikeCount((pre) => pre - 1);
        await deleteLike({
          variables: {
            postId: post.node._id,
          },
        });
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
      }
    } catch (error) {
      console.error('error', error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between px-1 py-3 text-xl" data-testid="post-actions">
        <div className="flex gap-3">
          <PostLike liked={liked} handleClickLike={handleClickLike} />
          <MessageCircle data-testid="comment-icon" className="cursor-pointer" />
        </div>
        <Bookmark data-testid="bookmark-icon" className="cursor-pointer" />
      </div>
      <div>
        <p data-testid="like-count">{likeCount} likes</p>
      </div>
    </>
  );
};
