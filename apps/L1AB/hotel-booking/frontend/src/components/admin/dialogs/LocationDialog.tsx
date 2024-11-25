'use client';
import React from 'react';

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
interface LocationDialogProps {
  location?: string;
}
export const LocationDialog = ({ location }: LocationDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-[#2563EB]">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Location</DialogTitle>
        </DialogHeader>
        <Textarea value={location} id="location" placeholder="Location" />
        <DialogFooter className="flex sm:justify-between w-full">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cencel
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-[#2563EB]">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
