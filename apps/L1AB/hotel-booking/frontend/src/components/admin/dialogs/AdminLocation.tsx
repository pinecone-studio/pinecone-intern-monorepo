'use client';
import React from 'react';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

export const AdminLocation = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-[#2563EB]">Edit</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Location</DialogTitle>
        </DialogHeader>
        <div className="flexf flex-col gap-4 py-4 font-bold">
          <div className="flex flex-col gap-4 mb-5">
            <div className="border rounded-md border-[#E4E4E7] px-3 pt-2 pb-8">
              <p className="text-sm font-normal text-[#09090B]">Damdinbazar street-52, Bayangol district, Bayangol, 212513 Ulaanbaatar, Mongolia</p>
            </div>
          </div>
        </div>
        <DialogFooter className="flex sm:justify-between w-full">
          <Button type="submit" className="bg-gray-200 text-black">
            Cancel
          </Button>
          <Button type="submit" className="bg-[#2563EB]">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
