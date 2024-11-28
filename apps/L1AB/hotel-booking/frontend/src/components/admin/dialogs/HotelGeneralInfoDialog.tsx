'use client';

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

type HotelGeneralInfoDialogProps = {
  name: string;
  phone: string;
  desc: string;
  stars: number;
};

export const HotelGeneralInfoDailog = ({ name, phone, desc, stars }: HotelGeneralInfoDialogProps) => {
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
            <Input id="name" value={name} className="" />
          </div>
          <div className="flexf flex-col gap-4 py-4 font-bold">
            <div className="flex flex-col gap-4 mb-5">
              <Label htmlFor="name" className="text-left">
                Description
              </Label>
              <Textarea value={desc} id="description" placeholder="Description" />
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full mb-5">
            <Label htmlFor="username" className="text-left">
              Stars Rating
            </Label>

            <Select>
              <SelectTrigger className="min-w-full">
                <SelectValue defaultValue={stars.toString()} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Stars</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-4 mb-5">
            <Label htmlFor="username" className="text-left">
              Phone Number
            </Label>
            <Input id="Price per night" value={phone} className="col-span-3" />
          </div>
        </div>
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
