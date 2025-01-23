'use client';
import React from 'react';
import Image from 'next/image';
import { ArrowLeft, Loader } from 'lucide-react';
import { CreateStoryStep2Props } from '@/components/types-story';
import CreateStoryLast from './CreateStoryLast';

export const CreateStoryStep2: React.FC<CreateStoryStep2Props> = ({ step, setStep, images, setOpenCreateStoryModal, loading /*setLoading*/ }) => {
  const [showFinalStep, setShowFinalStep] = React.useState(false);

  const handleBack = () => {
    setOpenCreateStoryModal(false);
    setStep(false);
  };

  const handleNext = () => {
    setShowFinalStep(true);
  };

  if (!images.length || !step) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" data-testid="create-post-step2-modal-story">
        <div className="bg-white rounded-xl max-w-xl w-full overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200" data-testid="modal-header-story">
            <button onClick={handleBack} className="hover:opacity-70 transition-opacity" data-testid="back-button-story">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-medium" data-testid="x-story">
              x
            </span>
            <button className="text-[#0095F6] hover:text-[#1877F2] transition-colors font-medium" onClick={handleNext} data-testid="next-button-story">
              Next
            </button>
          </div>

          {/* Image Container */}
          <div className="relative h-[626px]" data-testid="image-container-story">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10" data-testid="loading-overlay-story">
                <Loader className="w-10 h-10 animate-spin" data-testid="loader-story" />
              </div>
            )}
            <Image src={images[0]} alt="Selected image" fill className="object-cover rounded-b-lg" priority data-testid="selected-image-story" />
          </div>
        </div>
      </div>

      {showFinalStep && <CreateStoryLast images={images} setStep={setStep} /*setLoading={setLoading}*/ />}
    </>
  );
};

export default CreateStoryStep2;
