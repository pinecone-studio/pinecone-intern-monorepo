import { useCreateLikeMutation, useCreateSaveMutation, useGetLikesByPostIdQuery, useGetSavedByPostIdQuery } from '@/generated';
import { CardPropsType } from './PostCardCommentSection';
import { Bookmark, Heart, MessageCircle } from 'lucide-react';

const SaveButton = ({ isSaved, handleSave }: { isSaved: boolean; handleSave: () => void }) => {
  const saveFillColor = isSaved ? 'black' : 'white';

  return <Bookmark data-testid="saveButton" onClick={handleSave} className="cursor-pointer" fill={saveFillColor} />;
};

const PostCardLikeSection = ({ postId, userId }: CardPropsType) => {
  const { data: likedata, refetch: likesRefetch } = useGetLikesByPostIdQuery({ variables: { postId } });
  const { data: savedData, refetch: savedRefetch } = useGetSavedByPostIdQuery({ variables: { postId } });
  const likesData = likedata?.getLikesByPostId;

  const [createLike] = useCreateLikeMutation();
  const [createSave] = useCreateSaveMutation();

  const handleSave = async () => {
    await createSave({
      variables: {
        userId,
        postId,
      },
    });
    await savedRefetch();
  };

  const isLiked = userId ? likesData?.some((like) => like.userId === userId) : false;
  const isSaved = savedData?.getSavedByPostId[0]?.postId === postId;

  const handeLike = async () => {
    if (!userId) return;
    await createLike({
      variables: {
        userId,
        postId,
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
        <SaveButton isSaved={isSaved} handleSave={handleSave} />
      </div>
    </div>
  );
};

export default PostCardLikeSection;
