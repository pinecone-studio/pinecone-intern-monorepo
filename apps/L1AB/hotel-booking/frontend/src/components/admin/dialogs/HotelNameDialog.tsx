'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusIcon } from '@/components/icon';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export const HotelNameDialog = () => {
  const router = useRouter();
  const [hotelName, setHotelName] = React.useState('');
  const handleAddHotel = () => {
    if (hotelName.trim() === '') {
      return;
    }
    router.push(`/admin/hotels/${hotelName}`);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" bg-[#2563EB] text-[#FAFAFA] px-6 space-x-2">
          <PlusIcon />
          <span>Add Hotel</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:min-w-[626px]">
        <DialogHeader>
          <DialogTitle className="font-semibold">Hotel Name</DialogTitle>
          <DialogDescription>Enter the name of the hotel you want to add. This will be displayed in the list of hotels.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input id="hotelName" value={hotelName} onChange={(e) => setHotelName(e.target.value)} placeholder="Hotel Name" />
        </div>
        <DialogFooter className="flex sm:justify-between w-full">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cencel
            </Button>
          </DialogClose>
          <Button data-testid="add-hotel" onClick={handleAddHotel} className=" bg-[#2563EB] text-[#FAFAFA]">
            Next
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
