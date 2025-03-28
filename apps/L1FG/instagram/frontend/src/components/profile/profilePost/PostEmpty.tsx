'use client';
import CreatePostStep1 from '@/features/create-post/create-post/CreatePostStep1';
import { useGetUserTogetherQuery } from '@/generated';
import { Camera } from 'lucide-react';
import React from 'react';
import { Footer } from '../Footer';

const PostEmpty = ({ userId }: { userId: string }) => {
  const [openCreatePostModal, setOpenCreatePostModal] = React.useState(false);
  const handleClick = () => setOpenCreatePostModal(true);

  const { data } = useGetUserTogetherQuery({
    variables: { searchingUserId: userId },
  });

  const isOwnerId = data?.getUserTogether?.viewer?._id === userId;

  return (
    <div>
      {isOwnerId ? (
        <div className="flex flex-col gap-4" data-testid="post-empty">
          <div className="flex flex-col justify-center items-center gap-5 mt-20">
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="rounded-full border-2 border-black h-20 w-20 flex justify-center items-center" aria-label="Camera Icon">
                <Camera className="h-10 w-10" />
              </div>
              <h2 className="font-semibold text-3xl">Share Photos</h2>
            </div>

            <div className="flex flex-col justify-center items-center gap-10">
              <div className="flex flex-col justify-center items-center">
                <p>When you share photos, they will appear</p>
                <p>on your profile.</p>
              </div>
              <button className="font-medium text-sm text-blue-500 hover:text-black cursor-pointer" data-testid="post-empty-button" onClick={handleClick}>
                Share your first photo
              </button>
            </div>
          </div>

          {openCreatePostModal && <CreatePostStep1 openCreatePostModal={openCreatePostModal} setOpenCreatePostModal={setOpenCreatePostModal} />}

          <Footer />
        </div>
      ) : (
        <div className="flex flex-col gap-4" data-testid="post-empty">
          <div className="flex flex-col justify-center items-center gap-5 mt-20">
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="rounded-full border-2 border-black h-20 w-20 flex justify-center items-center" aria-label="Camera Icon">
                <Camera className="h-10 w-10" />
              </div>
              <h2 className="font-semibold text-3xl">No posts yet</h2>
            </div>
          </div>
          <div className="p-12"></div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default PostEmpty;
