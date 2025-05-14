import { Button } from '@/components/ui/button';
import React from 'react';
import { GuestInfo } from '../_feature/GuestDetail';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export const GuestInfoCard = ({ guestInfo }: { guestInfo: GuestInfo }) => {
  return (
    <div className="lg:col-span-2 max-w-[744px] w-full bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">Guest Info</h2>

        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">First name</p>
            <p className="font-medium">{guestInfo.firstName}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Last name</p>
            <p className="font-medium">{guestInfo.lastName}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">{guestInfo.status}</div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Guests</p>
            <p className="font-medium">
              {guestInfo.adults} adult, {guestInfo.children} children
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Check in</p>
            <p className="font-medium">{guestInfo.checkIn}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Check out</p>
            <p className="font-medium">{guestInfo.checkOut}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="font-medium">{guestInfo.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Phone number</p>
            <p className="font-medium">{guestInfo.phoneNumber}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Guest Request</p>
            <p className="font-medium">{guestInfo.guestRequest}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Room Number</p>
            <p className="font-medium">{guestInfo.roomNumber}</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">Checkout</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Checkout</DialogTitle>
              <DialogDescription>Are you sure you want to proceed with checking out this guest? This action cannot be undone.</DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2 ">
              <Button variant={'outline'} className="border px-4 ">
                Cancel
              </Button>
              <Button className="px-4 bg-[#2563EB] hover:bg-[#274b9a] ">Confirm</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
