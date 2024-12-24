'use client';
import { DialogContent, DialogClose } from '@/components/ui/dialog';
import { useCreateStoryMutation, useGetAllStoriesQuery } from '@/generated';
import Image from 'next/image';
import Media from 'public/Media';
import { useContext, useState } from 'react';
import { UserContext } from './providers';
import Loading from './Loading';

export const CreateStory = () => {
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const { user }: any = useContext(UserContext);

  const { refetch } = useGetAllStoriesQuery({ variables: { followerId: user._id } });

  const [createStory] = useCreateStoryMutation();

  const handleCreateStory = async () => {
    const input = {
      userId: user._id,
      image: imagePreview,
    };
    await createStory({ variables: { input } });
    setImagePreview('');
    refetch();
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    const files = event.target.files;

    if (!files || files.length === 0) return;

    const file = files[0];

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'ig-cloudinary');
    data.append('cloud_name', 'doqzizxvi');

    const res = await fetch('https://api.cloudinary.com/v1_1/doqzizxvi/image/upload', {
      method: 'POST',
      body: data,
    });
    const uploadedImage = await res.json();
    setImagePreview(uploadedImage.secure_url);
    setIsUploading(false);
  };

  return (
    <DialogContent className="p-0 h-1/2 gap-0">
      <div className="flex py-1 border-b relative">
        <div className="font-semibold w-fit flex-grow text-center">Create new story</div>
        <div data-testid="shareButton" className={`text-[#2563EB] absolute right-4 ${imagePreview ? 'flex' : 'hidden'}`} onClick={handleCreateStory}>
          <DialogClose>Share</DialogClose>
        </div>
      </div>
      {isUploading && !imagePreview ? (
        <Loading size={30} />
      ) : imagePreview ? (
        <div className="relative h-full border w-full rounded">
          <Image objectFit="cover" className="object-cover rounded" src={imagePreview} alt="Preview of uploaded image" fill />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <Media />
          <div>Drag photos and videos here</div>
          <div className="flex items-center justify-center">
            <input data-testid="fileInput" onChange={handleUpload} type="file" id="file-input" multiple className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" />
            <label className="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">Select from computer</label>
          </div>
        </div>
      )}
    </DialogContent>
  );
};
