'use client';
import { useState, useRef } from 'react';
import { PlusIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL as string;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET as string;

interface AddImageProps {
  onUpload?: (_urls: string[]) => void;
  handleSubmit?: (_urls: string[]) => Promise<void>;
  check?: boolean;
  setCheck?: (_value: boolean) => void;
}

export const AddImage: React.FC<AddImageProps> = ({ onUpload, handleSubmit, check, setCheck }) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const newImages = Array.from(files as FileList);
    setImages((prev) => [...prev, ...newImages]);
    setPreviews((prev) => [...prev, ...newImages.map((file) => URL.createObjectURL(file))]);
  };

  const uploadImage = async (image: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', UPLOAD_PRESET);

    const response = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleUpload = async () => {
    if (images.length === 0) return;
    setUploading(true);

    try {
      const uploadedUrls = await Promise.all(images.map(uploadImage));
      setPreviews([]);
      setImages([]);
      onUpload?.(uploadedUrls);
      await handleSubmit?.(uploadedUrls);
      setCheck?.(false);
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full h-full">
      <div className="w-full grid gap-2">
        <input data-testid="UploadFile" placeholder="image" type="file" accept="image/*" multiple onChange={handleFileChange} ref={fileInputRef} className="hidden" />
        <div className="grid gap-4 self-stretch border-[1px] border-[#E4E4E7] w-full rounded-md h-[160px] cursor-pointer" data-testid="ClickButton" onClick={() => fileInputRef.current?.click()}>
          <div className="flex flex-col items-center justify-center text-center w-full">
            <PlusIcon color="#2563EB" size={20} className="duration-500 hover:scale-150" />
            <p className="text-sm text-muted-foreground mt-2">Зураг оруулах</p>
          </div>
        </div>
        {previews.map((preview, index) => (
          <div key={index} className="relative w-full h-[200px]" data-testid={`Preview-mocked-url-${index}`}>
            <Image src={preview} alt="Preview" fill className="rounded-md" />
            <button onClick={() => handleRemove(index)} className="absolute top-2 right-2  text-white rounded-full py-1 px-2" data-testid={`RemoveImage-${index}`}>
              X
            </button>
          </div>
        ))}
      </div>
      <div className={`fixed inset-0 h-[1460px] z-50  bg-black bg-opacity-50 ${check ? 'block' : 'hidden'}`} onClick={() => setCheck!(false)} data-testid="CheckSet">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black p-6 rounded-lg text-white w-80" onClick={(e) => e.stopPropagation()}>
          <p className="text-lg mb-4">Create Event</p>
          <div className="flex justify-between">
            <Button onClick={() => setCheck!(false)} data-testid="CheckSet2">
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={uploading} data-testid="CreateEvent">
              {uploading ? 'Creating...' : 'Create Event'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
