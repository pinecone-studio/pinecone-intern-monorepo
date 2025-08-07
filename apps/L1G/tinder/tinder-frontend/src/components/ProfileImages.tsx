'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, Plus, Loader2 } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';

export const ProfileImages = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>(['', '', '', '', '', '']);
  const [isUploading, setIsUploading] = useState<boolean[]>([false, false, false, false, false, false]);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index);
      newImages.push('');
      return newImages;
    });

    setIsUploading((prev) => {
      const newUploading = prev.filter((_, i) => i !== index);
      newUploading.push(false);
      return newUploading;
    });
  };

  const getFirstEmptyIndex = () => uploadedImages.findIndex((img) => !img);

  const updateUploadingState = (index: number, value: boolean) => {
    setIsUploading((prev) => {
      const newUploading = [...prev];
      newUploading[index] = value;
      return newUploading;
    });
  };

  const uploadToCloudinary = async (file: File): Promise<string | null> => {
    if (!cloudName) return null;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'my_unsigned_preset');

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
      return res.data.secure_url || null;
    } catch (err) {
      console.error('Upload error:', err);
      return null;
    }
  };

  const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const index = getFirstEmptyIndex();
    if (index === -1) return;

    updateUploadingState(index, true);

    const url = await uploadToCloudinary(file);
    if (url) {
      setUploadedImages((prev) => {
        const newImages = [...prev];
        newImages[index] = url;
        return newImages;
      });
    }

    updateUploadingState(index, false);
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
            <div key={index} data-testid={`image-slot-${index}`} className="relative w-[197px] h-[296px] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
              {isUploading[index] ? (
                <Loader2 className="animate-spin w-8 h-8 text-gray-500" aria-label="Uploading" data-testid={`loader-${index}`} />
              ) : image ? (
                <>
                  <Image src={image} alt={`Uploaded image ${index + 1}`} fill className="object-cover" data-testid={`uploaded-image-${index}`} />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                    aria-label={`Remove image ${index + 1}`}
                    data-testid={`remove-button-${index}`}
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
          <Button
            variant="outline"
            className="relative w-full h-14 text-lg font-medium border-2 border-red-400 text-red-400 hover:bg-red-50 rounded-full bg-transparent overflow-hidden"
            aria-label="Upload image"
          >
            <Plus className="w-5 h-5 mr-2" />
            Upload image
            <input ref={fileInputRef} type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleUploadImage} data-testid="upload-input" />
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
