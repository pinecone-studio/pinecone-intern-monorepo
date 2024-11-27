'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export const ViewRulesDialog = () => {
  return (
    <div>
      ViewRulesDialog
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" className="text-[#2563EB]">
            View rules & restrictions
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px] z-index: 9999999; text-[#09090B]">
          <DialogHeader>
            <DialogTitle>Rules & restrictions</DialogTitle>
          </DialogHeader>
          <div className="flexf flex-col gap-4 py-4 ">
            <div className="flex flex-col gap-4 mb-5">
              <Label htmlFor="name" className="text-left font-semibold ">
                Cancellation
              </Label>
              <ul className="text-sm font-thin list-inside list-disc">
                <li>Free cancellation until 48 hours before check-in.</li>
                <li>Cancellations made after this period or no-shows will be charged the first night’s stay.</li>
              </ul>
              <div className="border border-gray"></div>
            </div>

            <div className="flex flex-col gap-4 mb-5">
              <Label htmlFor="name" className="text-left font-semibold ">
                Payment
              </Label>
              <ul className="text-sm font-thin list-inside list-disc">
                <li>A 20% deposit is required at the time of booking.</li>
                <li>The remaining balance is due at check-in.</li>
              </ul>
              <div className="border border-gray"></div>
            </div>

            <div className="flex flex-col gap-4 mb-5">
              <Label htmlFor="name" className="text-left font-semibold ">
                Smoking
              </Label>
              <p className="text-sm font-thin list-inside list-disc">This is a non-smoking property. A $200 cleaning fee will be charged for smoking in rooms.</p>
              <div className="border border-gray"></div>
            </div>

            <div className="flex flex-col gap-4 mb-5">
              <Label htmlFor="name" className="text-left font-semibold ">
                Damage:
              </Label>
              <p className="text-sm font-thin list-inside list-disc">Guests are responsible for any damage to the room during their stay.</p>
              <div className="border border-gray"></div>
            </div>
            <div className="flex flex-col gap-4 mb-5">
              <Label htmlFor="name" className="text-left font-semibold ">
                Health & Safety
              </Label>
              <p className="text-sm font-thin list-inside list-disc">Guests must follow our health and safety guidelines, including wearing masks in common areas.</p>
              <div className="border border-gray"></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
