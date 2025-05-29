'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useUpdateHotelMutation } from '@/generated';
import Image from 'next/image';
import { useState } from 'react';

type HotelImageProps = {
  hotel: {
    _id: string;
    images?: (string | null)[] | null;
  };
};

export const HotelImage = ({ hotel }: HotelImageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [updateHotel, { loading }] = useUpdateHotelMutation();
  const images = hotel.images ?? [];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => reader.result && setPreviewImages((prev) => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const handleSave = async () => {
    if (!hotel._id || !selectedFiles.length) return;
    const uploadedUrls = await Promise.all(
      selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'hotel-booking');
        const res = await fetch('https://api.cloudinary.com/v1_1/da889nybx/image/upload', { method: 'POST', body: formData });
        const data = await res.json();
        return data.secure_url || '';
      })
    );

    await updateHotel({
      variables: {
        updateHotelId: hotel._id,
        input: { images: [...images, ...uploadedUrls.filter(Boolean)] },
      },
    });
    setSelectedFiles([]);
    setPreviewImages([]);
    setIsOpen(false);
  };

  const handleDelete = async (img: string) => {
    if (!hotel._id) return;
    await updateHotel({
      variables: {
        updateHotelId: hotel._id,
        input: { images: images.filter((i) => i !== img) },
      },
    });
  };

  return (
    <div className="w-[23rem] max-h-[42rem] bg-white rounded-[0.5rem] border flex flex-col gap-4 pt-4 px-6 pb-6">
      <div className="flex w-[98%] h-9 justify-between items-center">
        <h4 className="text-lg font-semibold tracking-wide">Images</h4>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="py-2 flex items-center text-[#2563EB] text-sm font-medium">Edit</DialogTrigger>
          <DialogContent className="sm:min-w-[50rem]">
            <DialogHeader>
              <DialogTitle className="font-semibold text-base">Images</DialogTitle>
            </DialogHeader>
            <div className="pb-6 px-6 w-full h-[30rem] grid grid-cols-2 gap-2 overflow-scroll">
              <div className="relative border w-[345px] h-[200px] border-[#E4E4E7] bg-[#f4f4f5] rounded-sm p-8 text-center hover:border-gray-300 transition-colors cursor-pointer">
                <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="flex flex-col mt-10 items-center justify-center space-y-2">
                  <div className="w-6 h-6 text-[#2563EB]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                  <p className="text-sm font-light text-black">Drag or Upload Photo</p>
                </div>
              </div>
              {[...previewImages, ...images].map((src, i) => (
                <div key={i} className="relative group">
                  <Image src={src || '/placeholder.svg'} alt={`Hotel image ${i + 1}`} width={340} height={200} className="w-full h-[200px] object-cover rounded-sm" />
                  {images.includes(src) && (
                    <AlertDialog>
                      <AlertDialogTrigger className="absolute top-2 right-2 w-6 h-6 bg-[#3e3e3e9c] text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs">
                        x
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete image?</AlertDialogTitle>
                          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-500 hover:bg-red-500/80" onClick={() => handleDelete(src!)}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              ))}
            </div>
            <div className="w-full flex justify-between">
              <DialogClose asChild>
                <Button variant="ghost" onClick={() => setIsOpen(false)}>
                  Close
                </Button>
              </DialogClose>
              <Button className="px-4 py-2 bg-[#2563EB] hover:bg-[#2564ebeb]" onClick={handleSave} disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-2">
        {images.length > 0 && <Image src={images[0] || ''} data-testid="hotel-img" alt="Hotel main image" width={318} height={192} className="w-full h-48 object-cover rounded-sm" />}
        <div className="grid grid-cols-2 gap-2">
          {images.slice(1, 5).map((image, index) => (
            <div key={index} className="relative">
              <Image src={image || ''} alt={`Hotel image ${index + 2}`} width={155} height={128} className="w-full h-32 object-cover rounded-sm" />
              {index === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/40 rounded-sm flex items-center justify-center">
                  <span className="text-[#fafafa] font-light w-5 h-4 text-lg flex items-center ">
                    <p className="mb-[3px]">+</p>
                    <p>{images.length - 5}</p>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
