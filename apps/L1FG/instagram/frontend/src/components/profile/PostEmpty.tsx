'use client';
import { Camera } from 'lucide-react';

import Saved from '../svg/Saved';
import Posts from '../svg/Posts';
import { CreatePostStep1 } from '../create-post/CreatePostStep1';

import React from 'react';

const PostEmpty = () => {
  const [openCreatePostModal, setOpenCreatePostModal] = React.useState(false);

  const handleClick = () => {
    setOpenCreatePostModal(true);
  };

  return (
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

      <div className="text-gray-500 text-xs flex flex-col gap-4 mt-8">
        <p className="flex justify-center">About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
        <p className="flex justify-center">© 2024 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
};

export default PostEmpty;
