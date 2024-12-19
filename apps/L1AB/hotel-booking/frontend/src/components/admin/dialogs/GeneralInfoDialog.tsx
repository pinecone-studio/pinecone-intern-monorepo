'use client';
import React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAdmin } from '@/components/providers/AdminProvider';
const roomInfo = ['24-hour front desk', 'Concierge services', 'Tour/ticket assistance', 'Dry cleaning/laundry services', 'Luggage storage'];

export const GeneralInfoDialog = () => {
  const { addRoomForm } = useAdmin();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-blue-600 bg-white hover:bg-white">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>General Info</DialogTitle>
        </DialogHeader>
        <div className="flexf flex-col gap-4 py-4 ">
          <div className="flex flex-col gap-4 mb-5">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input id="name" placeholder="name" value={addRoomForm.values.name} onChange={addRoomForm.handleChange} onBlur={addRoomForm.handleBlur} />
          </div>
          <div className="flex flex-col gap-4 w-full mb-5">
            <Label htmlFor="username" className="text-left">
              Type
            </Label>
            <Select defaultValue={addRoomForm.values.roomType} onValueChange={(value) => addRoomForm.setFieldValue('roomType', value)}>
              <SelectTrigger className="min-w-full">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Rooms</SelectLabel>
                  <SelectItem value="ONE">Single</SelectItem>
                  <SelectItem value="TWO">Double</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-4 mb-5">
            <Label htmlFor="username" className="text-left">
              Price per night
            </Label>
            <Input id="Price per night" value={addRoomForm.values.price.toLocaleString()} onChange={addRoomForm.handleChange} onBlur={addRoomForm.handleBlur} />
          </div>

          <div className="flex flex-col gap-4 mb-5">
            <Label htmlFor="username" className="text-left">
              Room information
            </Label>
            <div className=" border py-2 px-3 flex-wrap gap-2 flex w-full rounded-md">
              {roomInfo?.map((item, index) => {
                return (
                  <div key={index} className="flex  ">
                    <div className=" rounded-xl text-xs font-semibold px-2 py-1 bg-[#F4F4F5]"> {item}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <DialogFooter className="flex sm:justify-between w-full">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cencel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" className="bg-[#2563EB]">
              Done
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
