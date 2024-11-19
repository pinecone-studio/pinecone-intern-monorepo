import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export const PriceDetailDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-blue-600 bg-white hover:bg-white">Click</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Price Detail </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <div className=" w-full flex justify-between">
            <div className="flex flex-col">
              <p className=" font-thin">2 night</p>
              <p className="text-stone-500">₮75,000 per night</p>
            </div>
            <div className="flex">₮ 150,000</div>
          </div>
          <div className="border w-full my-4 bg-slate-300"></div>
          <div className=" w-full flex justify-between">
            <div className="flex font-normal">Total price</div>
            <div className="flex  text-lg font-semibold">₮ 300,000</div>
          </div>
        </div>
        <DialogFooter>
          <Button className=" w-full text-white bg-blue-600  ">Resume</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
