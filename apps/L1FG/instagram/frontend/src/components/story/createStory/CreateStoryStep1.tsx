'use client';

import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import { CreatePostSvg } from '@/components/svg/CreatePostSvg';
import { CreateStoryStep1Props } from '@/components/types-story';
import CreateStoryStep2 from './CreateStoryStep2';

const ModalHeader: React.FC = () => (
  <div className="border-b border-gray-200 py-2" data-testid="modal-header-story">
    <h2 className="text-center text-base font-medium">Add story</h2>
  </div>
);

const LoadingOverlay: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black/10" data-testid="loading-overlay-story">
    <Loader className="w-10 h-10 animate-spin" />
  </div>
);

const UploadSection: React.FC<{
  handleUploadImages: (_event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ handleUploadImages }) => (
  <div className="flex flex-col items-center justify-center py-20 px-4" data-testid="modal-content-story">
    <label className="flex flex-col items-center gap-4 cursor-pointer" data-testid="upload-label-story">
      <div className="w-24 h-20 mb-4" data-testid="upload-icon-story">
        <CreatePostSvg />
      </div>
      <p className="text-xl" data-testid="upload-text-story">
        Drag photos here
      </p>
      <button
        className="bg-[#0095F6] text-sm px-4 py-2.5 text-white rounded-lg hover:bg-[#1877F2] transition-colors cursor-pointer"
        data-testid="select-from-computer-button-story"
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        Select from computer
      </button>
      <input id="file-upload" type="file" accept="image/*,video/*" multiple className="hidden" data-testid="file-upload-input-story" onChange={handleUploadImages} />
    </label>
  </div>
);

export const CreateStoryStep1: React.FC<CreateStoryStep1Props> = ({ openCreateStoryModal, setOpenCreateStoryModal }) => {
  const [images, setImages] = useState<string[]>([]);
  const [step, setStep] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUploadImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;

    if (!files?.length) return;
    setLoading(true);

    try {
      const filesArr = Array.from(files);
      const imageUrls = await Promise.all(
        filesArr.map(async (file) => {
          const data = new FormData();
          data.append('file', file);
          data.append('upload_preset', 'instagram');
          data.append('cloud_name', 'dqxstnqrf');

          const res = await fetch('https://api.cloudinary.com/v1_1/dqxstnqrf/image/upload', {
            method: 'POST',
            body: data,
          });

          if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
          const uploadedImage = await res.json();

          return uploadedImage.secure_url;
        })
      );

      setImages((prev) => [...prev, ...imageUrls]);
      setStep(true);
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!openCreateStoryModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 " data-testid="create-post-modal-story">
      <div className="bg-white rounded-xl w-[423px]  overflow-hidden" data-testid="create-post-modal-content-story">
        {/* Header */}
        <ModalHeader />

        {/* Content */}
        <div className="relative">
          {loading && <LoadingOverlay />}
          <UploadSection handleUploadImages={handleUploadImages} />
        </div>
      </div>

      {step && <CreateStoryStep2 step={step} setStep={setStep} images={images} setOpenCreateStoryModal={setOpenCreateStoryModal} loading={loading} setLoading={setLoading} />}
    </div>
  );
};

export default CreateStoryStep1;
