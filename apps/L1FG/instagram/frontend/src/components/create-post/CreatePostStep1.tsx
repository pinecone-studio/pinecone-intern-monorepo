'use client';

import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import { CreatePostSvg } from '../svg/CreatePostSvg';
import { CreatePostStep1Props } from '../types';
import { CreatePostStep2 } from './CreatePostStep2';

const ModalHeader: React.FC = () => (
  <div className="border-b border-gray-200 py-2" data-testid="modal-header">
    <h2 className="text-center text-base font-medium">Create new post</h2>
  </div>
);

const LoadingOverlay: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black/10" data-testid="loading-overlay">
    <Loader className="w-10 h-10 animate-spin" />
  </div>
);

const UploadSection: React.FC<{
  handleUploadImages: (_event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ handleUploadImages }) => (
  <div className="flex flex-col items-center justify-center py-20 px-4" data-testid="modal-content">
    <label className="flex flex-col items-center gap-4 cursor-pointer" data-testid="upload-label">
      <div className="w-24 h-20 mb-4" data-testid="upload-icon">
        <CreatePostSvg />
      </div>
      <p className="text-xl" data-testid="upload-text">
        Drag photos and videos here
      </p>
      <button
        className="bg-[#0095F6] text-sm px-4 py-2.5 text-white rounded-lg hover:bg-[#1877F2] transition-colors cursor-pointer"
        data-testid="select-from-computer-button"
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        Select from computer
      </button>
      <input id="file-upload" type="file" accept="image/*,video/*" multiple className="hidden" data-testid="file-upload-input" onChange={handleUploadImages} />
    </label>
  </div>
);

export const CreatePostStep1: React.FC<CreatePostStep1Props> = ({ openCreatePostModal, setOpenCreatePostModal }) => {
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
      alert(`Upload failed: Upload Error`);
    } finally {
      setLoading(false);
    }
  };

  if (!openCreatePostModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" data-testid="create-post-modal">
      <div className="bg-white rounded-xl max-w-xl w-full overflow-hidden" data-testid="create-post-modal-content">
        {/* Header */}
        <ModalHeader />

        {/* Content */}
        <div className="relative">
          {loading && <LoadingOverlay />}
          <UploadSection handleUploadImages={handleUploadImages} />
        </div>
      </div>

      {step && <CreatePostStep2 step={step} setStep={setStep} images={images} setOpenCreatePostModal={setOpenCreatePostModal} loading={loading} setLoading={setLoading} />}
    </div>
  );
};
