'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageDialog } from './ImageDialog';

type HotelDetailsImagesProps = {
  images?: string[];
};
export const HotelDetailsImages = ({ images }: HotelDetailsImagesProps) => {

  const [dialogOpen, setDialogOpen] = useState(false);
  const displayedImages = images?.slice(0, 5);

  return (
    <div className="grid grid-cols-4 gap-1 mt-4 [&>div:first-child]:col-span-2 [&>div:first-child]:row-span-2">
      {displayedImages?.map((image, index) => (
        <div data-testid="hotel-images" onClick={() => setDialogOpen(true)} key={index} className="h-[214px] w-full rounded-sm overflow-hidden relative border">
          <Image src={image} alt={`Image ${index + 1}`} fill />
        </div>
      ))}
      <ImageDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} images={images} />
    </div>
  );
};
