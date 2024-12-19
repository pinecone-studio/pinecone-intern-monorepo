'use client';

import { useCreateLikeMutation, useCreateSaveMutation, useGetLikesByPostIdQuery, useGetSavedByPostIdQuery } from '@/generated';
import { CardPropsType } from './PostCardCommentSection';
import { Bookmark, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import PostDetail from './PostDetail';

const SaveButton = ({ isSaved, handleSave }: { isSaved: boolean; handleSave: () => void }) => {
  return <Bookmark data-testid="saveButton" onClick={handleSave} className={`cursor-pointer   ${isSaved ? 'text-black  dark:text-white fill-current' : ' dark:text-white'}`} />;
};

const PostCardLikeSection = ({ postId, userId, images, caption, profilePicture, userName }: CardPropsType) => {
  const { data: likedata, refetch: likesRefetch } = useGetLikesByPostIdQuery({ variables: { postId } });
  const { data: savedData, refetch: saveRefetch } = useGetSavedByPostIdQuery({ variables: { postId } });
  const likesData = likedata?.getLikesByPostId || [];
  const savedByPostId = savedData?.getSavedByPostId;

  const [isSaved, setIsSaved] = useState(false);

  const [createLike] = useCreateLikeMutation({
    refetchQueries: ['getLikesByPostId'],
  });
  const [createSave] = useCreateSaveMutation();

  const isLiked = userId ? likesData?.some((like) => like.userId === userId) : false;

  const handleLike = async () => {
    if (!userId) return;
    await createLike({ variables: { userId, postId } });
    await likesRefetch();
  };

  const handleSave = async () => {
    if (!userId) return;
    await createSave({ variables: { userId, postId } });
    await saveRefetch();
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
    <div className="w-full ">
      <div className="flex pt-3 justify-between ">
        <div className="flex gap-4">
          <div className="flex gap-1">
            <Heart
              data-testid="likeButton"
              onClick={handleLike}
              className={`cursor-pointer  hover:text-[#71717A]  ${isLiked ? 'text-[#ff0000] dark:text-[#ff4d4d] fill-current' : ' dark:text-white'}`}
            />

            <div>{likesData?.length}</div>
          </div>
          <PostDetail postimages={images} postcaption={caption} userProfile={profilePicture} userName={userName} postId={postId} userId={userId} />
        </div>
        <SaveButton handleSave={handleSave} isSaved={isSaved} />
      </div>
    </div>
  );
};

export default PostCardLikeSection;
