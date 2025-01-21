'use client';

import React from 'react';
import { useCreatePostMutation } from '@/generated';
import { CreatePostProps } from '../types';
import Header from './lastCreatePost/Header';
import ImagePreview from './lastCreatePost/ImagePreview';
import CaptionInput from './lastCreatePost/CaptionInput';

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

    // alert('Post created successfully!');
    setStep(false);
    // } catch (error) {
    //   console.error('Error creating post:');
    //   alert('Failed to create post.');
    // } finally {
    //   setLoading(false);
    // }
  };

  // const handleBack = () => {
  //   setStep(true);
  // };

  return (
    <div className="bg-white rounded-lg w-full max-w-4xl h-[679px] flex flex-col border shadow-lg z-[100]" data-testid="create-post-modal">
      <Header /*handleBack={handleBack}*/ handleCreatePost={handleCreatePost} loadingPost={loadingPost} />

      {/* Content */}
      <div className="flex flex-1">
        <ImagePreview images={images} loadingPost={loadingPost} />

        {/* Caption & User Input */}
        <div className="w-[343px] p-4 flex flex-col gap-4">
          <CaptionInput caption={caption} setCaption={setCaption} />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
