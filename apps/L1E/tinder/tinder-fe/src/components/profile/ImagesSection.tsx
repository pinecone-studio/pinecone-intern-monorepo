'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import Image from 'next/image'; // Import Image from next/image

const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL as string;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET as string;

const ImagesSection = () => {
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

    const data = await response.json();
    return data.secure_url;
  };

  const handleUpload = async () => {
    if (images.length === 0) return;

    setUploading(true);

    try {
      await Promise.all(images.map(uploadImage));
      setUploading(false);
      setPreviews([]);
      setImages([]);
      toast.success('Image saved');
    } catch (error) {
      // Handle error, like showing an error toast
    }
  };

  const handleRemove = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Images Section</h2>
      <p className="border-b-2 mb-4">This is the images section where user images are displayed.</p>

      <main className="w-full max-w-2xl flex flex-col justify-center items-center mt-[20px] ">
        <div className="grid grid-cols-3 gap-6 w-[640px] h-auto">
          {previews.map((preview, index) => (
            <div key={index} data-testid="map" className="aspect-square relative bg-gray-50 rounded-lg overflow-hidden w-[200px] h-[300px]">
              <Image
                src={preview} // Use the preview URL here
                alt={`Uploaded Image ${index}`}
                width={200} // Set a fixed width
                height={300} // Set a fixed height
                className="w-full h-full object-cover"
              />
              <button onClick={() => handleRemove(index)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1" data-testid="remove">
                ×
              </button>
            </div>
          ))}
          {previews.length < 6 && (
            <div className="w-[200px] h-[300px] flex items-center justify-center border border-dashed rounded-lg relative">
              <input data-testid="addinput" type="file" accept="image/*" multiple onChange={handleFileChange} ref={fileInputRef} className="absolute inset-0 opacity-0 cursor-pointer" />
              <span data-testid="ClickButton" className="text-gray-400 text-xl">
                +
              </span>
            </div>
          )}
        </div>

        <div data-testid="check" className="flex justify-center w-full mt-4">
          <Button data-testid="create" onClick={handleUpload} className={`bg-[#E11D48E5] text-white rounded-full w-[640px] h-[36px]`} disabled={uploading}>
            Upload
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ImagesSection;
