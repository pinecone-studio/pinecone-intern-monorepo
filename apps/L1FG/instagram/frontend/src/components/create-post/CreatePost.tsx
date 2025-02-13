'use client';

import React from 'react';
import { useCreatePostMutation } from '@/generated';
import { CreatePostProps } from '../types';
import Header from './last-create-post/Header';
import ImagePreview from './last-create-post/ImagePreview';
import CaptionInput from './last-create-post/CaptionInput';

export const CreatePost: React.FC<CreatePostProps> = ({ images, setStep }) => {
  const [caption, setCaption] = React.useState('');
  const [createPost, { loading: loadingPost }] = useCreatePostMutation();

  const handleCreatePost = async () => {
    // if (!caption || !images.length) {
    //   alert('Please add a caption and an image.');
    //   return;
    // }

    // try {
    await createPost({
      variables: {
        input: {
          postImage: images,
          caption,
        },
      },
    });
    setStep(false);
  };

  return (
    <div className="bg-white rounded-lg w-full max-w-4xl h-[679px] flex flex-col border shadow-lg z-[100]" data-testid="create-post-modal">
      <Header /*handleBack={handleBack}*/ handleCreatePost={handleCreatePost} loadingPost={loadingPost} />

      {/* Content */}
      <div className="flex w-[423px] h-[626px] flex-1">
        <ImagePreview images={images} loadingPost={loadingPost} />

        {/* Caption & User Input */}
        <div className="w-[423px] p-4 flex flex-col gap-4">
          <CaptionInput caption={caption} setCaption={setCaption} />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
