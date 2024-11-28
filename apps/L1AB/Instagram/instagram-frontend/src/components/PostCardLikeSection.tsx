import { useCreateLikeMutation, useGetLikesByPostIdQuery } from '@/generated';
import { CardPropsType } from './PostCardCommentSection';
import { Bookmark, Heart, MessageCircle } from 'lucide-react';

const PostCardLikeSection = ({ postId, userId }: CardPropsType) => {
  const { data: likedata, refetch: likesRefetch } = useGetLikesByPostIdQuery({ variables: { postId: postId } });

  const likesData = likedata?.getLikesByPostId;

  const [createLike] = useCreateLikeMutation();

  const isLiked = userId ? likesData?.some((like) => like.userId === userId) : false;

  const handeLike = async () => {
    if (!userId) return;
    await createLike({
      variables: {
        userId: userId,
        postId: postId,
      },
    });

    await likesRefetch();
  };
  return (
    <div>
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
  );
};
export default PostCardLikeSection;
