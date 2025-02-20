'use client';
import React from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { CreatePostStep2Props } from '../../components/types';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CreatePostStep3 } from './CreatePostStep3';

export const CreatePostStep2: React.FC<CreatePostStep2Props> = ({ step, setStep, images, setOpenCreatePostModal }) => {
  const handleBack = () => {
    setStep(false);
  };

  if (!images.length || !step) return null;

  return (
    <Dialog>
      <div>
        <DialogContent className=" xl:max-w-[600px] h-[600px] p-0 gap-0 border-none" data-testid="create-post-step2-modal">
          <div className="flex justify-between py-2 px-4">
            <ArrowLeft onClick={handleBack} />
            <p className="text-lg font-medium">Create new post</p>
            <CreatePostStep3
              images={images as string[]}
              setStep={setStep as React.Dispatch<React.SetStateAction<boolean>>}
              setOpenCreatePostModal={setOpenCreatePostModal as React.Dispatch<React.SetStateAction<boolean>>}
            />
          </div>
          <div>
            <Image src={images[0]} alt="Selected image" className="object-cover rounded-b-lg w-full h-[556px]" data-testid="selected-image" width={800} height={580} />
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};
