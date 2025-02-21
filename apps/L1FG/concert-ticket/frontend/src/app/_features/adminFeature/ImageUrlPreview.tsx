import React, { useState, useRef, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

interface ImageUploadWithPreviewProps {
  name: string;
  value?: string;
  onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploadWithPreview = ({ name, value, onChange }: ImageUploadWithPreviewProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(value || null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImagePreview(value || null);
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      const uploadedUrl = await uploadImageToCloudinary(file);
      if (uploadedUrl) {
        onChange({
          target: {
            name: name,
            value: uploadedUrl,
          },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    } else {
      setImagePreview(null);

      onChange({
        target: {
          name: name,
          value: '',
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const uploadImageToCloudinary = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message);
      return data.secure_url;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleClearPreview = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    onChange({
      target: {
        name: name,
        value: '',
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div>
      <Label htmlFor="concertPhoto">Concert Photo</Label>
      <div className="relative w-full h-[200px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
        <Input
          type="file"
          id={name}
          name={name}
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          ref={fileInputRef}
          disabled={uploading}
        />
        {imagePreview ? (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <Image src={imagePreview} alt="Preview" width={600} height={200} className="max-w-full max-h-full rounded-lg object-contain" />
            <button onClick={handleClearPreview} className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600" disabled={uploading}>
              Clear
            </button>
          </div>
        ) : (
          <p className="text-gray-500">{uploading ? 'Uploading...' : 'Зураг Оруулах +'}</p>
        )}
      </div>
    </div>
  );
};

export default ImageUploadWithPreview;
