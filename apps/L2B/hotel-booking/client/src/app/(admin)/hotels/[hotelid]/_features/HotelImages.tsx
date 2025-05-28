'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useHotelQuery, useUpdateHotelMutation } from '@/generated';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const HotelImage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const hotelId = searchParams.get('hotelid');
  const { data, refetch } = useHotelQuery({
    variables: { hotelId: hotelId as string },
    skip: !hotelId,
  });
  const hotel = data?.hotel;
  const images = hotel?.images ?? [];
  const [updateHotel, { loading: mutationLoading }] = useUpdateHotelMutation();
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    setSelectedFiles((prev) => [...prev, ...fileArray]);

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreviewImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSave = async () => {
    if (!hotelId || selectedFiles.length === 0) return;
    const uploadedUrls: string[] = [];
    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'hotel-booking');

      const res = await fetch('https://api.cloudinary.com/v1_1/da889nybx/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secureurl) {
        uploadedUrls.push(data.secureurl);
      }
    }
    const updatedImages = [...images, ...uploadedUrls];
    await updateHotel({
      variables: {
        updateHotelId: hotelId,
        input: {
          images: updatedImages,
        },
      },
    });
    refetch();
    setSelectedFiles([]);
    setPreviewImages([]);
    setIsOpen(false);
  };

  useEffect(() => {
    if (hotelId) {
      refetch();
    }
  }, [hotelId, refetch]);

  return (
    <div className="w-[23rem] max-h-[42rem] bg-white rounded-[0.5rem] border flex flex-col gap-4 pt-4 px-6 pb-6">
      <div className="flex w-[98%] h-9 justify-between items-center">
        <h4 className="text-lg font-semibold tracking-wide">Images</h4>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger data-testid="hotel-image-edit" className="py-2 flex items-center text-[#2563EB] text-sm font-medium">
            Edit
          </DialogTrigger>
          <DialogContent className="sm:min-w-[50rem]">
            <DialogHeader>
              <DialogTitle className="font-semibold text-base">Images</DialogTitle>
            </DialogHeader>
            <div className="pb-6 px-6 w-full h-[30rem] grid grid-cols-2 gap-2 overflow-scroll">
              <div
                data-testid="file-input"
                className="relative border w-[345px] h-[200px] border-[#E4E4E7] bg-[#f4f4f5] rounded-sm p-8 text-center hover:border-gray-300 transition-colors cursor-pointer"
              >
                <input data-testid="hotel-image-upload" type="file" multiple accept="image/*" onChange={handleFileUpload} className="absolute inset-0 w-full h-[200px] opacity-0 cursor-pointer" />
                <div className="flex flex-col mt-10 items-center justify-center space-y-2">
                  <div className="w-6 h-6 text-[#2563EB]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                  <p className="text-sm font-light text-black">Drag or Upload Photo</p>
                </div>
              </div>
              {previewImages.map((src, index) => (
                <div key={`preview-${index}`} className="relative group">
                  <Image src={src} alt={`New preview ${index + 1}`} width={340} height={200} className="w-full h-[200px] object-cover rounded-sm" />
                </div>
              ))}
              {images.map((image, index) => (
                <div key={`existing-${index}`} className="relative group">
                  <Image src={image || '/placeholder.svg'} alt={`Hotel image ${index + 1}`} width={340} height={200} className="w-full h-[200px] object-cover rounded-sm" />
                </div>
              ))}
            </div>
            <div className="w-full flex justify-between">
              <DialogClose asChild>
                <Button variant={'ghost'} onClick={() => setIsOpen(false)}>
                  Close
                </Button>
              </DialogClose>
              <Button className="px-4 py-2 bg-[#2563EB] hover:bg-[#2564ebeb]" onClick={handleSave} disabled={mutationLoading}>
                {mutationLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col gap-2">
        {images.length > 0 && (
          <div className="w-full bg-amber-50">
            <Image src={images[0] || ''} data-testid="hotel-img" alt="Hotel main image" width={318} height={192} className="w-full h-48 object-cover rounded-sm" />
          </div>
        )}
        <div className="grid grid-cols-2 gap-2">
          {images.slice(1, 5).map((image, index) => {
            const isLastVisibleImage = index === 3 && images.length > 5;
            const remainingCount = images.length - 5;
            return (
              <div key={index} className="relative bg-amber-50">
                <Image src={image || ''} alt={`Hotel image ${index + 2}`} width={155} height={128} className="w-full h-32 object-cover rounded-sm" />
                {isLastVisibleImage && (
                  <div className="absolute inset-0 bg-black/40 rounded-sm flex items-center justify-center">
                    <span className="text-[#fafafa] font-light w-5 h-4 text-lg flex items-center ">
                      <p className="mb-[3px]">+</p>
                      <p>{remainingCount}</p>
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
