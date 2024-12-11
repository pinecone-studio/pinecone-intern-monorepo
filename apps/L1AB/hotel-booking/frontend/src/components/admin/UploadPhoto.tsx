'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CldImage, CldUploadButton } from 'next-cloudinary';
import { useState } from 'react';

export const UploadPhoto = () => {
  const [img, setImg] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOnSuccess = (response: any) => {
    setImg((prev) => [...prev, response.info.url]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-gray-800 text-white hover:bg-gray-700" onClick={() => setIsOpen(true)}>
          Upload photo
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(event) => event.preventDefault()} className="sm:max-w-[1160px] p-6 space-y-4 bg-white rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-left font-medium text-xl text-gray-900">Images</DialogTitle>
        </DialogHeader>
        <div className="relative flex flex-wrap space-y-2 gap-4">
          {img.map((url, index) => (
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
          <CldUploadButton className="px-3 m-0 bg-[#F4F4F5] h-[310px] w-[542px] text-white rounded-[8px] transition-all" onSuccess={handleOnSuccess} uploadPreset="images">
            <div className="flex flex-col gap-2 justify-center items-center"> </div>
          </CldUploadButton>
        </div>
        <DialogFooter>
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
            Cancel
          </Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-500">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
