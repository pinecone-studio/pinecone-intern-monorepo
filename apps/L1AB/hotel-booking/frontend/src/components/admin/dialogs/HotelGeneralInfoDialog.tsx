'use client';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const HotelGeneralInfoDailog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-[#2563EB]">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] z-index: 9999999;">
        <DialogHeader>
          <DialogTitle>General Info</DialogTitle>
        </DialogHeader>
        <div className="flexf flex-col gap-4 py-4 ">
          <div className="flex flex-col gap-4 mb-5">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input id="name" defaultValue="Chingis Khaan Hotel" className="" />
          </div>
          <div className="flexf flex-col gap-4 py-4 font-bold">
            <div className="flex flex-col gap-4 mb-5">
              <Label htmlFor="name" className="text-left">
                Description
              </Label>
              <div className="border rounded-md border-[#E4E4E7] px-3 pt-2 pb-8">
                <p className="text-sm font-normal text-[#09090B]">Ulaanbaatar hotel in Downtown Ulaanbaatar with 4 restaurants and a full-service spa</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full mb-5">
            <Label htmlFor="username" className="text-left">
              Stars Rating
            </Label>

            <Select>
              <SelectTrigger className="min-w-full">
                <SelectValue placeholder="5 Stars" />
              </SelectTrigger>
              <SelectContent className="z-index: 10000;">
                <SelectGroup>
                  <SelectItem value="5 Stars">5 Stars</SelectItem>
                  <SelectItem value="4 Stars">4 Stars</SelectItem>
                  <SelectItem value="3 Stars">3 Stars</SelectItem>
                  <SelectItem value="2 Stars">2 Stars</SelectItem>
                  <SelectItem value="1 Stars">1 Stars</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-4 mb-5">
            <Label htmlFor="username" className="text-left">
              Phone Number
            </Label>
            <Input id="Price per night" defaultValue="72700800" className="col-span-3" />
          </div>
          <div className="flex flex-col gap-4 w-full mb-5">
            <Label htmlFor="username" className="text-left">
              Rating
            </Label>

            <Select>
              <SelectTrigger className="min-w-full">
                <SelectValue placeholder="8.6 Excellent" />
              </SelectTrigger>
              <SelectContent className="z-index: 10000;">
                <SelectGroup>
                  <SelectItem value="9 Excellent">9 Excellent</SelectItem>
                  <SelectItem value="8.6 Excellent">8.6 Excellent</SelectItem>
                  <SelectItem value="8 Very Good">8 Very Good</SelectItem>
                  <SelectItem value="7 good">7 good</SelectItem>
                  <SelectItem value="7 good">5 bad</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="flex sm:justify-between w-full">
          <Button type="submit" variant="ghost" className="text-[#09090B]">
            Cancel
          </Button>
          <Button variant="ghost" className="bg-[#2563EB]">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
