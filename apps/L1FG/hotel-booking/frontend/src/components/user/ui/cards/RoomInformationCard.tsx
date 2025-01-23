import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ChevronRightIcon from '../svg/ChevronRightIcon';
import { X } from 'lucide-react';
import Image from 'next/image';
import FlowerIcon from '../svg/FlowerIcon';
import ParkingCircleIcon from '../svg/ParkingCircleIcon';
import UtensilsIcon from '../svg/UtensilsIcon';
import DumbBellIcon from '../svg/DumbBellIcon';
import BusIcon from '../svg/BusIcon';
import DoorClosedIcon from '../svg/DoorClosedIcon';
import { PriceDetail } from '../../hotel-detail';
import WifiIcon from '../svg/WifiIcon';
import { RoomDetails } from './RoomDetails';

export const RoomInformationCard = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm font-Inter font-medium leading-5 text-[#2563EB] flex gap-2 items-center py-2">
          <div>Show more</div>
          <ChevronRightIcon />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[578px] max-h-[600px] p-6 rounded-[8px]">
        <DialogHeader>
          <DialogTitle>Room information</DialogTitle>

          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 dark:ring-offset-slate-950 dark:focus:ring-slate-800 dark:data-[state=open]:bg-slate-800">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <ScrollArea className="h-[386px] ">
          <div className=" w-full flex flex-col gap-5">
            <Carousel className="relative w-full">
              <CarouselContent>
                <CarouselItem className="w-full">
                  <Image src="/EconomySingleRoom.png" alt="Economy Single Room" height={216} width={349} className="rounded-t-[6px] w-full" layout="responsive" />
                </CarouselItem>
                <CarouselItem>
                  <Image src="/EconomySingleRoom.png" alt="Economy Single Room" height={216} width={349} className="rounded-t-[6px] w-full" layout="responsive" />
                </CarouselItem>
                <CarouselItem>
                  <Image src="/EconomySingleRoom.png" alt="Economy Single Room" height={216} width={349} className="rounded-t-[6px] w-full" layout="responsive" />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-sm border border-input bg-white flex items-center justify-center" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-sm border border-input bg-white flex items-center justify-center" />
            </Carousel>
            <div className="font-Inter text-lg font-semibold leading-7 flex flex-col gap-4">Economy Single Room</div>

            <div className="grid grid-cols-3 gap-3">
              <div className="flex items-center gap-2">
                <WifiIcon />
                <p className="text-sm font-Inter font-normal leading-5">Free WiFi</p>
              </div>
              <div className="flex items-center gap-2">
                <FlowerIcon />
                <p className="text-sm font-Inter font-normal leading-5">Spa access</p>
              </div>
              <div className="flex items-center gap-2">
                <ParkingCircleIcon />
                <p className="text-sm font-Inter font-normal leading-5">Free self parking</p>
              </div>
              <div className="flex items-center gap-2">
                <UtensilsIcon />
                <p className="text-sm font-Inter font-normal leading-5">Complimentary breakfast</p>
              </div>
              <div className="flex items-center gap-2">
                <DumbBellIcon />
                <p className="text-sm font-Inter font-normal leading-5">Fitness center access</p>
              </div>
              <div className="flex items-center gap-2">
                <BusIcon />
                <p className="text-sm font-Inter font-normal leading-5">Airport shuttle service</p>
              </div>
              <div className="flex items-center gap-2">
                <DoorClosedIcon />
                <p className="text-sm font-Inter font-normal leading-5">Room cleaning service</p>
              </div>
              <div className="flex items-center gap-2">
                <UtensilsIcon />
                <p className="text-sm font-Inter font-normal leading-5">Complimentary breakfast</p>
              </div>
              <div className="flex items-center gap-2">
                <DumbBellIcon />
                <p className="text-sm font-Inter font-normal leading-5">Fitness center access</p>
              </div>
              <div className="flex items-center gap-2">
                <BusIcon />
                <p className="text-sm font-Inter font-normal leading-5">Airport shuttle service</p>
              </div>
              <div className="flex items-center gap-2">
                <DoorClosedIcon />
                <p className="text-sm font-Inter font-normal leading-5">Room cleaning service</p>
              </div>
            </div>

            <RoomDetails />

            <div className="w-full border p-4 rounded-[8px] flex justify-between">
              <div>
                <div className="text-xs font-Inter font-normal leading-4 text-muted-foreground">Total</div>
                <div className="text-xl font-Inter font-medium leading-7">225,000₮</div>
                <div className="text-xs font-Inter font-normal leading-4 flex gap-1">
                  <p className="font-Inter font-normal not-italic text-xs">112,500₮</p>
                  <p>Price per night</p>
                </div>
                <div className="w-full flex items-center justify-between">
                  <PriceDetail />
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center justify-end">
                {' '}
                <p className="text-xs font-medium text-[#F97316]">We have 2 left</p>
                <DialogFooter>
                  <button type="submit" className="bg-[#2563EB] py-2 px-4 flex justify-center items-center rounded-md text-[#FAFAFA]">
                    Reserve
                  </button>{' '}
                </DialogFooter>
              </div>
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
