'use client';
import React from 'react';
import Image from 'next/image';
import { ArrowLeft, Loader } from 'lucide-react';
import { CreatePost } from './CreatePost';
import { CreatePostStep2Props } from '../types';

export const CreatePostStep2: React.FC<CreatePostStep2Props> = ({ step, setStep, images, setOpenCreatePostModal, loading /*setLoading*/ }) => {
  const [showFinalStep, setShowFinalStep] = React.useState(false);

  const handleBack = () => {
    setOpenCreatePostModal(false);
    setStep(false);
  };

  const handleNext = () => {
    setShowFinalStep(true);
  };

  if (!images.length || !step) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" data-testid="create-post-step2-modal">
        <div className="bg-white rounded-xl max-w-xl w-full overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200" data-testid="modal-header">
            <button onClick={handleBack} className="hover:opacity-70 transition-opacity" data-testid="back-button">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-medium" data-testid="crop-text">
              Crop
            </span>
            <button className="text-[#0095F6] hover:text-[#1877F2] transition-colors font-medium" onClick={handleNext} data-testid="next-button">
              Next
            </button>
          </div>

          {/* Image Container */}
          <div className="relative h-[626px]" data-testid="image-container">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10" data-testid="loading-overlay">
                <Loader className="w-10 h-10 animate-spin" data-testid="loader" />
              </div>
            )}
            <Image src={images[0]} alt="Selected image" fill className="object-cover rounded-b-lg" priority data-testid="selected-image" />
          </div>
        </div>
      </div>

      {showFinalStep && <CreatePost images={images} setStep={setStep} /*setLoading={setLoading}*/ />}
    </>
  );
};

export default CreatePostStep2;
