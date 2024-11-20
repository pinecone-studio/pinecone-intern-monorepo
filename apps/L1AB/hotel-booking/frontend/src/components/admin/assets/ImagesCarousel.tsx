import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
const images = [
  'http://example.com/image1.jpg',
  'http://example.com/image1.jpg',
  'http://example.com/image2.jpg',
  'http://example.com/image1.jpg',
  'http://example.com/image1.jpg',
  'http://example.com/image1.jpg',
  'http://example.com/image1.jpg',
];
export const ImagesCarousel = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-1 mt-4">
        <div className="col-span-2 h-64 rounded-sm overflow-hidden relative">
          <Image src={images[0]} alt="carousel image 0" fill></Image>
        </div>
        <div className="h-32 rounded-sm overflow-hidden relative">
          <Image src={images[1]} alt="carousel image 1" fill></Image>
        </div>
        <div className="h-32 rounded-sm overflow-hidden relative">
          <Image src={images[2]} alt="carousel image 2" fill></Image>
        </div>
        <div className="h-32 rounded-sm overflow-hidden relative">
          <Image src={images[3]} alt="carousel image 3" fill></Image>
        </div>
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
              <CarouselPrevious className="size-12 -left-6 border-none bg-black text-white" />
              <CarouselNext className="size-12 -right-6 border-none bg-black text-white" />
            </Carousel>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
