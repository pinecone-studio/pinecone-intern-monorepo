import React from 'react';
import { ImagesCarousel } from '../ImagesCarousel';
import { ImageOff } from 'lucide-react';
import { UploadPhoto } from '../../UploadPhoto';

export const HotelDetailsImages = ({ images }: { images: string[] }) => {
  return (
    <div data-testid="HotelDetailsImages" className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Images</h1>
        <UploadPhoto images={images} />
      </div>
      {images.length > 0 ? (
        <ImagesCarousel images={images} />
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
