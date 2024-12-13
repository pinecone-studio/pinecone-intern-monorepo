import React from 'react';
import { ImagesCarousel } from '../ImagesCarousel';
import { ImageOff } from 'lucide-react';
import { UploadPhoto } from '../../UploadPhoto';
import { useAdmin } from '@/components/providers/AdminProvider';

export const HotelDetailsImages = () => {
  const { addHotelForm } = useAdmin();
  return (
    <div data-testid="HotelDetailsImages" className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Images</h1>
        <UploadPhoto />
      </div>
      {addHotelForm.values.images.length > 0 ? (
        <ImagesCarousel images={addHotelForm.values.images} />
      ) : (
        <div className="flex flex-col items-center gap-4 py-8">
          <ImageOff className="text-gray-500" />
          <div className="space-y-1 text-center">
            <h3>No Photos Uploaded</h3>
            <p className="text-sm text-muted-foreground">Add photos of your rooms, amenities, or property to showcase your hotel.</p>
          </div>
        </div>
      )}
    </div>
  );
};
