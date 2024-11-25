import React from 'react';
import { Button } from '@/components/ui/button';
import { ImagesCarousel } from '../ImagesCarousel';

export const HotelDetailsImages = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Images</h1>
        <Button className="text-blue-600 bg-white hover:bg-white">Edit</Button>
      </div>
      <ImagesCarousel />
    </div>
  );
};
