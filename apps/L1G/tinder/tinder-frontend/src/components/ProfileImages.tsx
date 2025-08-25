'use client';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, Plus, Loader2 } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
import { useUploadImagesMutation } from '@/generated';
import { UserData } from '@/app/(auth)/signup/page';
type ProfileImagesProps = {
  onSuccess: () => void;
  onBack: () => void;
  updateUserData: (_: Partial<UserData>) => void;
};
<<<<<<< HEAD
=======

>>>>>>> 88289f998 (test lint)
export const ProfileImages = ({ onSuccess, onBack, updateUserData }: ProfileImagesProps) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>(['', '', '', '', '', '']);
  const [isUploading, setIsUploading] = useState<boolean[]>([false, false, false, false, false, false]);
  const [uploadImagesMutation, { loading }] = useUploadImagesMutation();
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
  const handleNext = async () => {
    const nonEmptyImages = uploadedImages.filter((url) => url);
    updateUserData({ images: nonEmptyImages });

    if (nonEmptyImages.length === 0) {
      alert('Please upload at least one image.');
      return;
    }
    try {
      await uploadImagesMutation({
        variables: {
          images: nonEmptyImages,
        },
      });
      onSuccess();
    } catch (err) {
      console.error('Failed to upload images to backend:', err);
      alert('Something went wrong while saving your images.');
    }
  };
  return (
    <div className="w-[640px] bg-white flex flex-col items-center justify-center gap-6">
      <div className="w-full max-w-2xl gap-[16px] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-1 py-2 justify-center">
          <h1 className="font-sans font-[500] text-[24px] text-gray-900 ">Upload your image</h1>
          <p className="font-sans font-[400] text-[14px] text-gray-500">Please choose an image that represents you.</p>
        </div>
        <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6">
          {uploadedImages.map((image, index) => (
            <div
              key={index}
              data-testid={`image-slot-${index}`}
              className="relative w-[100px] h-[150px] md:w-[157px] md:h-[226px] lg:w-[197px] lg:h-[296px] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center"
            >
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
        <div className="w-full flex justify-center items-center ">
          <Button
            variant="outline"
            className="w-[300px] md:w-full py-2 flex gap-2 relative h-[36px] font-[400] text-md font-sans border border-red-400 text-[#18181B] hover:bg-red-50 rounded-full bg-transparent overflow-hidden"
            aria-label="Upload image"
          >
            <Plus size={16} color="#E4345A" />
            Upload image
            <input ref={fileInputRef} type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleUploadImage} data-testid="upload-input" />
          </Button>
        </div>
        <div className="w-[300px] md:w-full h-[36px] flex justify-between items-center">
          <Button onClick={onBack} variant="outline" className="px-4 py-2 text-[14px] font-[400] border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full bg-transparent">
            Back
          </Button>
          <Button onClick={handleNext} disabled={loading} className="px-4 py-2 text-[14px] font-[400] bg-[#E11D48E5] bg-opacity-90 hover:bg-red-500 text-white rounded-full">
            {loading ? <Loader2 className="animate-spin w-4 h-4" data-testid="next-loader" /> : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

ProfileImages.displayName = 'ProfileImages';
