'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export const CheckInDialog = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="text-[#2563EB]">
            Check in and special instructions
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px] z-index: 9999999; text-[#09090B]">
          <DialogHeader>
            <DialogTitle>Check in and special instructions</DialogTitle>
          </DialogHeader>
          <div className="flexf flex-col gap-4 py-4 ">
            <div className="flex flex-col gap-4 mb-5">
              <Label htmlFor="name" className="text-left font-semibold ">
                Check-in Process
              </Label>
              <p className="text-sm font-thin list-inside list-disc">Guests are required to present a valid ID and booking confirmation at check-in.</p>
              <div className="border border-gray"></div>
            </div>

            <div className="flex flex-col gap-4 mb-5">
              <Label htmlFor="name" className="text-left font-semibold ">
                Late Check-in
              </Label>
              <p className="text-sm font-thin list-inside list-disc">If you expect to arrive after 8:00 PM, please inform the property in advance to ensure a smooth check-in process.</p>
              <div className="border border-gray"></div>
            </div>

            <div className="flex flex-col gap-4 mb-5">
              <Label htmlFor="name" className="text-left font-semibold ">
                Parking Info
              </Label>
              <p className="text-sm font-thin list-inside list-disc">If you expect to arrive after 8:00 PM, please inform the property in advance to ensure a smooth check-in process.</p>
              <div className="border border-gray"></div>
            </div>

            <div className="flex flex-col gap-4 mb-5">
              <Label htmlFor="name" className="text-left font-semibold ">
                Contact Information
              </Label>
              <p className="text-sm font-thin list-inside list-disc">
                If you need assistance before your arrival, please contact us at <span className="border-b-2 border-[#09090B]"> +976 70080072 </span> or{' '}
                <span className="border-b-2 border-[#09090B]">support@pedia.mn. </span>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
