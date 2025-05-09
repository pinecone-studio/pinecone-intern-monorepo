'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { IoIosClose } from 'react-icons/io';

const Featured = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-end text-2xl">
            <IoIosClose />
          </div>
          <DialogTitle>Онцлох тоглолт болгох</DialogTitle>
          <RadioGroup defaultValue="comfortable" className="flex pt-3 gap-5">
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
        <DialogFooter>
          <Button type="submit" className="w-[436px] mt-[16px]">
            Хадгалах
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default Featured;
