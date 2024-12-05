import React from 'react';
import { Button } from '@/components/ui/button';
import { ImagesCarousel } from '../ImagesCarousel';
import { ImageOff } from 'lucide-react';

type HotelDetailsImagesProps = {
  images?: string[];
};
export const HotelDetailsImages = ({ images }: HotelDetailsImagesProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Images</h1>
        <Button variant="ghost" className="text-blue-600">
          Edit
        </Button>
      </div>
      {images ? (
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
