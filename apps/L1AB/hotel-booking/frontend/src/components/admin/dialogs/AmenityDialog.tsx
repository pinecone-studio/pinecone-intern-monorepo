'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import React from 'react';

export const AmenityDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-[#2563EB]">Edit</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[626px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold not-italic">Amenities</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className=" flex flex-col gap-2">
            <div>Amenities</div>
            <div className="border rounded-md border-[#E4E4E7] p-6 "></div>
          </div>
        </div>
        <DialogFooter className="flex sm:justify-between w-full">
          <button className=" text-[#09090B]" type="submit">
            Cancel
          </button>
          <Button className=" bg-[#2563EB] text-[#FAFAFA]" type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};