import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { AirVent, BedDouble, LampDeskIcon, BathIcon, Wifi, KeyIcon, ShowerHead, ForkKnife,  GlassWater, ParkingCircle } from 'lucide-react';
import { FaPeopleArrows, FaPhotoFilm } from 'react-icons/fa6';

export const RoomInfo = () => {
  const roomFeatures = [
    {
      title: 'Air conditioning',
      icon: AirVent,
    },
    {
      title: 'Double Bed',
      icon: BedDouble,
    },
    {
      title: 'Desk',
      icon: LampDeskIcon,
    },
    {
      title: 'Bathrobes',
      icon: BathIcon,
    },
    {
      title: 'Sleeps 2',
      icon: FaPeopleArrows,
    },
    {
      title: 'Free WiFi',
      icon: Wifi,
    },
    {
      title: 'Private Bathroom',
      icon: KeyIcon,
    },
    {
      title: 'Shower/tub combination',
      icon: ShowerHead,
    },
    {
      title: 'Free breakfast',
      icon: ForkKnife,
    },
    {
      title: '18 sq m',
      icon: FaPhotoFilm,
    },
    {
      title: 'Free bottle water',
      icon: GlassWater,
    },
    {
      title: 'Free self parking',
      icon: ParkingCircle,
    },
  ];

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit</Button>
        </DialogTrigger>
        <DialogContent className="w-[575px] flex flex-col p-[24px] gap-5 max-w-2xl h-[900px]">
          <DialogHeader>
            <DialogTitle>Room Information</DialogTitle>
            <DialogDescription>
              <Carousel className="w-full mt-4 max-w-xs">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <span className="text-4xl font-semibold">{index + 1}</span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="font-inter text-lg font-semibold leading-7 p-6 flex flex-col w-full">
                <h1 className="not-italic font-sans text-black text-lg font-semibold">Economy Double Room, City View</h1>
                <div className="grid grid-cols-3 grid-rows-4 w-full mt-5">
                  {roomFeatures.map((roomFeature, index) => {
                    const Icon = roomFeature.icon;
                    return (
                      <div className="flex text-sm font-medium text-black items-center gap-2" key={index}>
                        <Icon className="w-4 h-4" />
                        <p>{roomFeature.title}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-5 flex">
                  <div>
                    <h1 className="text-black not-italic font-sans text-lg font-semibold p-1">Accessibility</h1>
                    <li className="pl-5 font-thin text-black text-sm">Access via exterior corridors</li>
                    <li className="pl-5 font-thin text-black text-sm">Thin carpet in room</li>
                  </div>
                  <div className="ml-5">
                    <h1 className="text-black not-italic font-sans text-lg font-semibold p-1">Bathroom</h1>
                    <li className="pl-5 font-thin text-black text-sm">Bathrobes</li>
                    <li className="pl-5 font-thin text-black text-sm">Free toiletries</li>
                    <li className="pl-5 font-thin text-black text-sm">Hair dryer</li>
                    <li className="pl-5 font-thin text-black text-sm">Private bathroom</li>
                    <li className="pl-5 font-thin text-black text-sm">Shower/tub combination</li>
                    <li className="pl-5 font-thin text-black text-sm">Slippers</li>
                    <li className="pl-5 font-thin text-black text-sm">Toothbrush and toothpaste</li>
                    <li className="pl-5 font-thin text-black text-sm">Towels</li>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter />
        </DialogContent>
      </Dialog>
    </div>
  );
};
