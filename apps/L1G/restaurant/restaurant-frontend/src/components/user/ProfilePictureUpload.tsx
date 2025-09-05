'use client';
import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, User } from 'lucide-react';
import { UploadImage } from '@/utils/image-upload';

interface ProfilePictureUploadProps {
  currentImage?: string;
  onImageUpdate: (imageUrl: string) => void;
  isLoading?: boolean;
  onError?: (message: string) => void;
  onSuccess?: (message: string) => void;
}

export const ProfilePictureUpload = ({ currentImage, onImageUpdate, isLoading = false, onError, onSuccess }: ProfilePictureUploadProps) => {
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
      const imageUrl = await UploadImage(file);
      onImageUpdate(imageUrl);
      onSuccess?.('Профайл зураг шинэчлэгдлээ');
    } catch {
      onError?.('Зураг байршуулахад алдаа гарлаа');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative group" data-testid="profile-upload">
      <Avatar className="w-24 h-24 border-2 border-green-500" data-testid="profile-avatar">
        <AvatarImage src={currentImage || 'placeholder.svg'} alt="Profile picture" data-testid="profile-avatar-img" />
        <AvatarFallback>
          <User className="w-12 h-12 text-gray-400" />
        </AvatarFallback>
      </Avatar>
      <div className="absolute bottom-2 right-2">
        <Button size="sm" variant="secondary" className="rounded-full p-2 h-8 w-8" disabled={uploading || isLoading} asChild data-testid="profile-edit-btn">
          <label htmlFor="profile-picture-upload" className="cursor-pointer">
            <Edit className="w-4 h-4" />
            <input id="profile-picture-upload" type="file" accept="image/*" onChange={handleFileSelect} className="hidden" data-testid="profile-upload-input" disabled={uploading || isLoading} />
          </label>
        </Button>
      </div>
    </div>
  );
};
