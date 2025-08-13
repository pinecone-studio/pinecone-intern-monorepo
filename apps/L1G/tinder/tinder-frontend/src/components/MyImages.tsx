'use client';
import { Separator } from '@/components/ui/separator';
import { useState, useRef } from 'react';
import axios from 'axios';
import { X, Plus, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export const MyImages = () => {
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
    if (!cloudName) {
      console.error('Cloudinary cloud name is missing!');
      return null;
    }

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
    <div className="flex flex-col w-[672px] max-w-[672px]">
      <div className="flex flex-col gap-[1px] justify-start items-start ">
        <p className="text-[18px] font-sans font-[500] text-[#09090B]">Your Images</p>
        <p className="text-[14px] font-sans font-[400] text-[#71717A]">Please choose an image that represents you.</p>
      </div>

      <div className="py-6">
        <Separator />
      </div>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-6">
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
        <div className="w-full">
          <Button
            variant="outline"
            className="py-2 flex gap-2 relative w-full h-[36px] font-[400] text-md font-sans border border-red-400 text-[#18181B] hover:bg-red-50 rounded-full bg-transparent overflow-hidden"
            aria-label="Upload image"
          >
            <Plus size={16} color="#E4345A" />
            Upload image
            <input ref={fileInputRef} type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleUploadImage} data-testid="upload-input" />
          </Button>
        </div>
      </div>
    </div>
  );
};
