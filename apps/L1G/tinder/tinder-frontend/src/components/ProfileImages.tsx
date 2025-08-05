'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import Image from 'next/image';
export const ProfileImages = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>(['https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg', '', '', '', '', '']);

  const handleRemoveImage = (index: number) => {
    const newImages = [...uploadedImages];
    newImages[index] = '';
    setUploadedImages(newImages);
  };

  const handleUploadImage = () => {
    console.log('Upload image clicked');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-[24px] font-semibold text-gray-900 mb-4">Upload your image</h1>
          <p className="text-[14px] text-gray-500">Please choose an image that represents you.</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-12">
          {uploadedImages.map((image, index) => (
            <div key={index} className="relative w-[197px] h-[296px] bg-gray-100 rounded-xl overflow-hidden">
              {image ? (
                <>
                  <Image src={image || '/placeholder.svg'} alt={`Uploaded image ${index + 1}`} fill className="object-cover" />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </>
              ) : (
                <div className="w-full h-full bg-gray-100" />
              )}
            </div>
          ))}
        </div>

        <div className="mb-12">
          <Button onClick={handleUploadImage} variant="outline" className="w-full h-14 text-lg font-medium border-2 border-red-400 text-red-400 hover:bg-red-50 rounded-full bg-transparent">
            <Plus className="w-5 h-5 mr-2" />
            Upload image
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <Button variant="outline" className="px-8 py-3 text-lg font-medium border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full bg-transparent">
            Back
          </Button>
          <Button className="px-8 py-3 text-lg font-medium bg-red-400 hover:bg-red-500 text-white rounded-full">Next</Button>
        </div>
      </div>
    </div>
  );
};
