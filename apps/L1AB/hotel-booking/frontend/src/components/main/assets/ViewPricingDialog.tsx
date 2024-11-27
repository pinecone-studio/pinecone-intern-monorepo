import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export const ViewPricingDialog = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-blue-600 bg-white hover:bg-white">Click</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="font-semibold text-xl">Price Detail </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col">
            <div className=" w-full flex flex-col  justify-between gap-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1 text-sm">
                  <p className=" font-thin">1 night</p>
                  <p className="text-stone-500">$78.30 per night</p>
                </div>
                <div>₮ 150,000</div>
              </div>
              <div className="flex  justify-between">
                <p className="text-sm">Taxes</p>
                <p>12,000₮</p>
              </div>
            </div>
            <div className="border-b w-full my-4"></div>
          </div>
          <DialogFooter>
            <div className=" w-full flex justify-between">
              <div className="flex font-normal">Total price</div>
              <div className="flex  text-lg font-semibold">162,000₮</div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
