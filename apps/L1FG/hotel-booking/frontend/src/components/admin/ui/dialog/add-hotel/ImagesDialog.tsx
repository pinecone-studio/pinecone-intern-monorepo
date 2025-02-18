'use client';

import { HotelImagesProps } from '@/components/admin/add-hotel/type';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { PlusIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export const ImagesDialog = ({ images, setImages, handleEditHotelImages }: HotelImagesProps) => {
  const [loading, setLoading] = useState(false);

  const handleUploadImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setLoading(true);

    try {
      const filesArr = Array.from(files);
      const imageUrls = await Promise.all(
        filesArr.map(async (file) => {
          const data = new FormData();
          data.append('file', file);
          data.append('upload_preset', 'hotel_booking');
          data.append('cloud_name', 'dsjr8e4oe');

          const res = await fetch('https://api.cloudinary.com/v1_1/dsjr8e4oe/image/upload', {
            method: 'POST',
            body: data,
          });

          if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
          const uploadedImage = await res.json();

          return uploadedImage.secure_url;
        })
      );

      setImages([...images, ...imageUrls]);
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="px-4 py-2 text-[#2563EB] font-Inter text-sm font-medium hover:bg-[#F4F4F5] rounded-sm transition-all duration-200">Edit</button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[1160px] w-full gap-6">
        <AlertDialogTitle className="font-Inter text-base font-semibold leading-4 tracking-[-0.4px]">Images</AlertDialogTitle>
        <div className="max-h-[660px] overflow-hidden overflow-y-scroll">
          <div className="h-[1590px] grid grid-cols-2 grid-rows-5 gap-x-2 gap-y-[10px]">
            <button
              data-testid="upload-button"
              onClick={() => document.getElementById('file-upload')?.click()}
              className="h-full flex flex-col gap-2 border border-[#E4E4E7] rounded-[4px] bg-[#F4F4F5] justify-center items-center"
            >
              <PlusIcon color="#2563EB" width={20} height={20} />
              <p className="text-[#09090B] font-Inter text-sm font-normal">Drag or Upload Photo</p>
            </button>
            <input id="file-upload" type="file" accept="image/*,video/*" multiple className="hidden" data-testid="file-upload-input" onChange={handleUploadImages} />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white opacity-70 z-[999]">
                <div className="flex flex-col justify-center items-center gap-1">
                  <div className="relative">
                    <div className="w-[38px] h-[38px] border-[6px] border-blue-200 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-[38px] h-[38px] border-[6px] border-[#2563EB] border-t-transparent border-r-transparent border-l-transparent  rounded-full animate-spin"></div>
                  </div>
                  <p className="font-Inter font-normal text-ms text-[#09090B]">Uploading...</p>
                </div>
              </div>
            )}
            {images.map((img, index) => (
              <div key={index} className="relative w-full h-full">
                <Image src={img} alt={`Hotel Image ${index}`} layout="fill" className="rounded-sm object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <AlertDialogCancel className="px-4 py-2 bg-white rounded-[6px] ">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleEditHotelImages} className="px-4 py-2 bg-[#2563EB] rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#256eeb]">
            Save
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
