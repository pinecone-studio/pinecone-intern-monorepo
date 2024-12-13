'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CldImage, CldUploadButton } from 'next-cloudinary';
import { useState } from 'react';
import { useAdmin } from '../providers/AdminProvider';
import { Plus } from 'lucide-react';

export const UploadPhoto = () => {
  const { addHotelForm } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const handleOnSuccess = (response: any) => {
    addHotelForm.setFieldValue('images', [...addHotelForm.values.images, response.info.url]);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-[#2563EB]">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1160px] p-6 space-y-4 bg-white rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-left font-medium text-xl text-gray-900">Images</DialogTitle>
        </DialogHeader>
        <div className="relative flex flex-wrap space-y-2 gap-4 max-h-[700px] overflow-y-scroll">
          <CldUploadButton
            data-testid="upload-photo"
            className="px-3 m-0 bg-[#F4F4F5] h-[310px] w-[542px] mt-2 text-white rounded-[8px] transition-all"
            onSuccess={handleOnSuccess}
            uploadPreset="images"
          >
            <div className="flex flex-col gap-2 justify-center items-center">
              <Plus className="text-[#2563EB]" />
              <p className="text-black text-sm">Drag or Upload Photo</p>
            </div>
          </CldUploadButton>
          {addHotelForm.values.images.map((url, index) => (
            <CldImage
              key={index}
              className="object-cover mt-2 object-center min-w-1/2 max-h-[310px] rounded-lg border border-gray-200"
              src={url}
              width="542"
              height="310"
              alt={`Uploaded image ${index + 1}`}
              crop={{ type: 'auto', source: true }}
            />
          ))}
        </div>
        <DialogFooter className="flex sm:justify-between w-full">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cencel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" className="bg-[#2563EB]">
              Done
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
