'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StepFourthCart } from '../_components/StepFourthCart';
import { ImageUpload } from '../_components/ImageUpload';

const ImageUploadPage = ({ setStep }: { setStep: (_step: number) => void }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!selectedImages.length) {
      setError('Please select a photo to upload.');
      return;
    } else {
      setStep(4);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    const newImages = [...selectedImages];
    for (let i = 0; i < files!.length; i++) {
      if (newImages.length < 6) {
        newImages.push(URL.createObjectURL(files![i]));
      }
    }
    setSelectedImages(newImages);
  };
  const removeImage = (index: number) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };
  return (
    <div className="flex w-full flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-[640px]">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">Upload your image</h1>
          <p className="text-sm text-gray-500">Please choose an image that represents you.</p>
        </div>
        <div className="mb-6 grid grid-cols-3 gap-2 w-full">
          {Array(6)
            .fill(0)
            .map((_, index) => {
              if (index < selectedImages.length) {
                return <StepFourthCart key={index} index={index} selectedImages={selectedImages} removeImage={removeImage} />;
              } else {
                return <div key={index} className="flex w-[197px] h-[296px] items-center justify-center rounded-md bg-gray-100"></div>;
              }
            })}
          {error && (
            <p data-cy="imageError" className="text-sm text-red-500">
              {error}
            </p>
          )}
        </div>
        <ImageUpload handleImageUpload={handleImageUpload} />

        <div className="flex justify-between">
          <Button data-cy="step-button" variant="outline" className="px-6 border-[#E4E4E7] border rounded-full" onClick={() => setStep(2)}>
            Back
          </Button>
          <Button className="bg-gradient-to-r from-pink-500 to-red-500 px-6 text-white hover:from-pink-600 hover:to-red-600 rounded-full" onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ImageUploadPage;
