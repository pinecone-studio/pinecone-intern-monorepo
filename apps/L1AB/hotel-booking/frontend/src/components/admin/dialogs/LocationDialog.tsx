'use client';
import React from 'react';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAdmin } from '@/components/providers/AdminProvider';

export const LocationDialog = () => {
  const { addHotelForm, showError } = useAdmin();
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
        <Textarea id="address" name="address" placeholder="Location" onChange={addHotelForm.handleChange} onBlur={addHotelForm.handleBlur} value={addHotelForm.values.address} />
        {showError('address', addHotelForm.errors, addHotelForm.touched) && <label className="text-sm text-red-600 px-3">{addHotelForm.errors.address}</label>}
        <DialogFooter className="flex sm:justify-between w-full">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cencel
            </Button>
          </DialogClose>
          {!addHotelForm.errors.address ? (
            <DialogClose asChild>
              <Button type="submit" className="bg-[#2563EB]">
                Done
              </Button>
            </DialogClose>
          ) : (
            <Button type="submit" className="bg-[#2563EB]">
              Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
