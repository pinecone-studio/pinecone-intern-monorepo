'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StepFourthCart } from '../_components/StepFourthCart';

const ImageUploadPage = ({ setStep }: { setStep: (_step: number) => void }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!selectedImages.length) {
      setError('Please select a photo to upload.');
      return;
    }
    // if (selectedImages.length <= 1) {
    //   setError('Please upload at least 1 photo to continue.');
    //   return;
    // }
    setStep(4);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = [...selectedImages];
      for (let i = 0; i < files.length; i++) {
        if (newImages.length < 9) {
          newImages.push(URL.createObjectURL(files[i]));
        }
      }
      setSelectedImages(newImages);
    }
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
          {error && <p data-cy='imageError' className="text-sm text-red-500">{error}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="image-upload" className="flex w-full cursor-pointer items-center justify-center rounded-full border border-[#E11D48] py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Plus className="mr-2 h-4 w-4" />
            Upload image
            <input id="image-upload" type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
          </label>
        </div>

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
