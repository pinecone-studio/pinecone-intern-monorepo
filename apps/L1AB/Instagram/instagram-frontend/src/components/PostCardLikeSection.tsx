'use client';

import { useCreateLikeMutation, useCreateSaveMutation, useGetLikesByPostIdQuery, useGetSavedByPostIdQuery } from '@/generated';
import { CardPropsType } from './PostCardCommentSection';
import { Bookmark, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import PostDetail from './PostDetail';
import { motion } from 'framer-motion';

const LikeButton = ({ isLiked, handleLike }: { isLiked: boolean; handleLike: () => void }) => {
  const hoverEffect = !isLiked ? { color: '#9CA3AF' } : undefined;
  return (
    <motion.div
      data-testid="likeButton"
      onClick={handleLike}
      className="cursor-pointer"
      style={{ color: isLiked ? '#ff0000' : '' }}
      initial={{ scale: 1 }}
      whileTap={{ scale: 1.4 }}
      whileHover={hoverEffect}
      transition={{ duration: 0.1 }}
      animate={{ scale: 1, transition: { duration: 0.2 } }}
    >
      <Heart className={`${isLiked ? 'text-[#ff0000]' : 'text-black'}  ${isLiked ? 'text-[#ff0000] dark:text-[#ff4d4d] fill-current' : ' dark:text-white'}`} />
    </motion.div>
  );
};

const SaveButton = ({ isSaved, handleSave }: { isSaved: boolean; handleSave: () => void }) => {
  const hoverEffect = !isSaved ? { color: '#9CA3AF' } : undefined;
  return (
    <motion.div
      data-testid="saveButton"
      onClick={handleSave}
      className="cursor-pointer text-black"
      initial={{ scale: 1 }}
      whileTap={{ scale: 1.4 }}
      whileHover={hoverEffect}
      transition={{ duration: 0.1 }}
      animate={{ scale: 1, transition: { duration: 0.2 } }}
    >
      <Bookmark className={`cursor-pointer   ${isSaved ? 'text-black  dark:text-white fill-current' : ' dark:text-white'}`} />
    </motion.div>
  );
};

const PostCardLikeSection = ({ postId, userId, images, caption, profilePicture, userName }: CardPropsType) => {
  const { data: likedata, refetch: likesRefetch } = useGetLikesByPostIdQuery({ variables: { postId } });
  const { data: savedData } = useGetSavedByPostIdQuery({ variables: { postId } });
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
    <div className="w-full ">
      <div className="flex pt-3 justify-between ">
        <div className="flex gap-4">
          <div className="flex gap-1">
            <LikeButton isLiked={isLiked} handleLike={handleLike} />
            <div className={`cursor-pointer  hover:text-[#71717A] `}>{likesData?.length}</div>
          </div>
          <motion.div whileHover={{ color: '#9CA3AF' }}>
            <PostDetail postimages={images} postcaption={caption} userProfile={profilePicture} userName={userName} postId={postId} userId={userId} />
          </motion.div>
        </div>
        <SaveButton handleSave={handleSave} isSaved={isSaved} />
      </div>
    </div>
  );
};

export default PostCardLikeSection;
