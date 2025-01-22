'use client';

import React from 'react';
import HeaderStory from './lastCreateStory/HeaderStory';
import ImagePreviewStory from './lastCreateStory/ImagePreviewStory';
import { useCreateStoryMutation } from '@/generated';
import { CreateStoryProps } from '@/components/types-story';

export const CreateStoryLast: React.FC<CreateStoryProps> = ({ images, setStep }) => {
  // const [caption, setCaption] = React.useState('');
  const [createStory, { loading: loadingPost }] = useCreateStoryMutation();

  const handleCreatePost = async () => {
    // if (!caption || !images.length) {
    //   alert('Please add a caption and an image.');
    //   return;
    // }

    // try {
    await createStory({
      variables: {
        input: {
          storyImage: images[0],
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
    <div className="bg-white rounded-lg w-full max-w-4xl h-[679px] flex flex-col border shadow-lg z-[100]" data-testid="create-post-modal-story">
      <HeaderStory /*handleBack={handleBack}*/ handleCreatePost={handleCreatePost} loadingPost={loadingPost} />

      {/* Content */}
      <div className="flex flex-1">
        <ImagePreviewStory images={images} loadingPost={loadingPost} />

        {/* Caption & User Input */}
        {/* <div className="w-[343px] p-4 flex flex-col gap-4">
          <CaptionInput caption={caption} setCaption={setCaption} />
        </div> */}
      </div>
    </div>
  );
};

export default CreateStoryLast;
