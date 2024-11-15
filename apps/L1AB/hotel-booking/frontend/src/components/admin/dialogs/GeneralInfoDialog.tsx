'use client';
import React from 'react';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
const roomInfo = [
  {
    info: '24-hour front desk',
  },
  {
    info: 'Concierge services',
  },
  {
    info: 'Tour/ticket assistance',
  },
  {
    info: 'Dry cleaning/laundry services',
  },
  {
    info: 'Luggage storage',
  },
];

export const GeneralInfoDialog = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="text-[#2563EB]">Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>General Info</DialogTitle>

            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flexf flex-col gap-4 py-4 ">
            <div className="flex flex-col gap-4 mb-5">
              <Label htmlFor="name" className="text-left">
                Name
              </Label>
              <Input id="name" defaultValue="Chingis Khaan Hotel" className="" />
            </div>

            <div className="flex flex-col gap-4 w-full mb-5">
              <Label htmlFor="username" className="text-left">
                Type
              </Label>

              <Select>
                <SelectTrigger className="min-w-full">
                  <SelectValue placeholder="Single" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Rooms</SelectLabel>
                    <SelectItem value="apple">Single</SelectItem>
                    <SelectItem value="banana">Double</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-4 mb-5">
              <Label htmlFor="username" className="text-left">
                Price per night
              </Label>
              <Input id="Price per night" defaultValue="150,000₮" className="col-span-3" />
            </div>

            <div className="flex flex-col gap-4 mb-5">
              <Label htmlFor="username" className="text-left">
                Room information
              </Label>
              <Input id="Price per night" defaultValue="150,000₮" className="col-span-3" />
              <div className=" border py-2 px-3 flex-wrap gap-2 flex w-full ">
                {roomInfo?.map((item, index) => {
                  return (
                    <div key={index} className="flex  ">
                      <div className=" rounded-xl text-xs font-semibold px-2 py-1 bg-[#F4F4F5]"> {item.info}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <DialogFooter className="flex sm:justify-between w-full">
            <Button type="submit" variant="ghost" className="text-[#09090B">
              Cancel
            </Button>
            <Button type="submit" className="bg-[#2563EB]">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
