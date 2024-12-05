'use client';

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAdmin } from '@/components/providers/AdminProvider';

export const HotelGeneralInfoDailog = () => {
  const { addHotelForm, showError } = useAdmin();
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
            <Input id="name" name="name" value={addHotelForm.values.name} onChange={addHotelForm.handleChange} onBlur={addHotelForm.handleBlur} />
            {showError('name', addHotelForm.errors, addHotelForm.touched) && <label className="text-sm text-red-600 px-3">{addHotelForm.errors.name}</label>}
          </div>
          <div className="flexf flex-col gap-4 py-4 font-bold">
            <div className="flex flex-col gap-4 mb-5">
              <Label htmlFor="name" className="text-left">
                Description
              </Label>
              <Textarea id="description" name="description" value={addHotelForm.values.description} onChange={addHotelForm.handleChange} onBlur={addHotelForm.handleBlur} />
              {showError('description', addHotelForm.errors, addHotelForm.touched) && <label className="text-sm text-red-600 px-3">{addHotelForm.errors.description}</label>}
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full mb-5">
            <Label htmlFor="username" className="text-left">
              Stars Rating
            </Label>
            <Select defaultValue={addHotelForm.values.stars.toString()} onValueChange={(value) => addHotelForm.setFieldValue('stars', parseInt(value))}>
              <SelectTrigger className="min-w-full">
                <SelectValue placeholder="Select stars" />
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
            {showError('stars', addHotelForm.errors, addHotelForm.touched) && <label className="text-sm text-red-600 px-3">{addHotelForm.errors.stars}</label>}
          </div>
          <div className="flex flex-col gap-4 mb-5">
            <Label htmlFor="username" className="text-left">
              Phone Number
            </Label>
            <Input id="phone" name="phone" value={addHotelForm.values.phone} className="col-span-3" onChange={addHotelForm.handleChange} onBlur={addHotelForm.handleBlur} />
            {showError('phone', addHotelForm.errors, addHotelForm.touched) && <label className="text-sm text-red-600 px-3">{addHotelForm.errors.phone}</label>}
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
