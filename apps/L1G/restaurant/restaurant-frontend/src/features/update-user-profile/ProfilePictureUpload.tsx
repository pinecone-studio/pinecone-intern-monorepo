'use client';
import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, User } from 'lucide-react';
import { uploadCloudinaryPicture } from '@/utils/ProfilePicCloudinary';

interface ProfilePictureUploadProps {
  currentImage?: string;
  onImageUpdate: (imageUrl: string) => void;
  isLoading?: boolean;
  onError?: (message: string) => void;
  onSucces?: (message: string) => void;
}

export const ProfilePictureUpload = ({ currentImage, onImageUpdate, isLoading = false, onError, onSucces }: ProfilePictureUploadProps) => {
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onError?.('Зөвхөн зураг файл сонгоно уу');
      return;
    }
    setUploading(true);
    try {
      const imageUrl = await uploadCloudinaryPicture(file);
      onImageUpdate(imageUrl);
      onSucces?.('Профайл зураг шинэчлэгдлээ');
    } catch (error) {
      onError?.('Зураг байршуулахад алдаа гарлаа');
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="relative group">
      <Avatar className="w-24 h-24 border-2 border-green-500">
        <AvatarImage src={currentImage || 'placeholder.svg'} alt="Profile picture" />
        <AvatarFallback>
          <User className="w-12 h-12 text-gray-400" />
        </AvatarFallback>
      </Avatar>
      <div className="absolute bottom-2 right-2">
        <Button size="sm" variant="secondary" className="rounded-full p-2 h-8 w-8" disabled={uploading || isLoading} asChild>
          <label htmlFor="profile-picture-upload" className="cursor-pointer">
            <Edit className="w-4 h-4" />
            <input id="profile-picture-upload" type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
          </label>
        </Button>
      </div>
    </div>
  );
};
