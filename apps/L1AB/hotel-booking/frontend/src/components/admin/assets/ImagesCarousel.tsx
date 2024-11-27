'use client';
import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

type ImagesCarouselProps = {
  images: string[];
};

export const ImagesCarousel = ({ images }: ImagesCarouselProps) => {
  return (
    <div className="grid grid-cols-2 gap-1 mt-4 [&>div:first-child]:col-span-2 [&>div:first-child]:h-64">
      {images.slice(0, 4).map((image, index) => {
        return (
          <div key={index} className="h-32 rounded-sm overflow-hidden relative">
            <Image src={image} alt={`carousel image ${index}`} fill></Image>
          </div>
        );
      })}
      {images.length > 4 && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-32 rounded-sm overflow-hidden relative">
              <Image src={images[4]} alt="carousel image 4" fill></Image>
              <div className="w-full h-full flex justify-center items-center bg-black/50 text-white absolute">+ {images.length - 4}</div>
            </Button>
          </DialogTrigger>
          <DialogContent className="py-12 px-10 min-w-[calc(100vw-320px)]">
            <Carousel className="w-full">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="h-[calc(100vh-320px)] rounded-sm overflow-hidden relative">
                      <Image src={image} alt={`carousel image ${index}`} fill></Image>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="w-12 h-12 -left-6 border-none bg-black text-white" />
              <CarouselNext className="w-12 h-12 -right-6 border-none bg-black text-white" />
            </Carousel>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
