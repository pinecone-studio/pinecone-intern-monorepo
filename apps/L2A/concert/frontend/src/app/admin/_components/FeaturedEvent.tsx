'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { HiOutlinePlus } from 'react-icons/hi';
import { IoIosClose } from 'react-icons/io';

const FeaturedEvent = () => {
  return (
    <Dialog data-cy="featured-event">
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-end text-2xl">
            <IoIosClose />
          </div>
          <DialogTitle>Онцлох тоглолт болгох</DialogTitle>
          <RadioGroup defaultValue="comfortable" className="flex pt-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">Тийм</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Үгүй</Label>
            </div>
          </RadioGroup>
        </DialogHeader>
        <div className="grid  mb-[-16]">
          <div className="grid grid-cols-4 items-center ">
            <Input placeholder="Гарчиг оруулах" className="col-span-3 w-[375px] " />
          </div>
        </div>
        <div className="w-[375px] h-[160px] bg-[#E4E4E7] rounded-lg  ">
          <div className=" mt-[65px] ">
            <div className="gap-4 mt-4 ">
              <div className="text-[#2563EB] flex justify-center mb-2">
                <HiOutlinePlus />
              </div>
              <div className="flex  justify-center"> Зураг оруулах</div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-[436px]">
            Хадгалах
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default FeaturedEvent;
