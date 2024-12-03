import { useCreateLikeMutation, useGetLikesByPostIdQuery } from '@/generated';
import { CardPropsType } from './PostCardCommentSection';
import { Heart, Bookmark } from 'lucide-react';
import PostDetail from './PostDetail';

const PostCardLikeSection = ({ postId, userId, userName, images, profilePicture, caption}: CardPropsType) => {
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
          <PostDetail postimages={images} postcaption={caption} userProfile={profilePicture} userName={userName} postId={postId} userId={userId || ''}/>
        </div>
        <Bookmark />
      </div>
    </div>
  );
};
export default PostCardLikeSection;
