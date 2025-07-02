import { Button } from '@/components/ui/button';
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Booking } from '@/generated';

export const GuestInfoCard = ({
  guestInfo,
  checkInDate,
  checkOutDate,
  handleUpdateStatus,
  open,
  setOpen,
  loading,
}: {
  guestInfo: Booking | null | undefined;
  checkInDate: string;
  checkOutDate: string;
  handleUpdateStatus: (_status: 'checked_out' | 'cancelled') => Promise<void>;
  open: boolean;
  setOpen: (_open: boolean) => void;
  loading: boolean;
}) => {
  return (
    <div className="lg:col-span-2 max-w-[744px] w-full bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">Guest Info</h2>

        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">First name</p>
            <p className="font-medium">{guestInfo?.userId.firstName}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Last name</p>
            <p className="font-medium">{guestInfo?.userId.lastName}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <div
              className={`inline-block ${
                guestInfo?.status === 'checked_out' ? 'bg-[#18BA51]' : guestInfo?.status === 'cancelled' ? 'bg-[#F97316]' : 'bg-[#2563EB]'
              } text-white px-3 py-1 rounded-full text-xs font-medium`}
            >
              {guestInfo?.status}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Guests</p>
            <p className="font-medium">
              {guestInfo?.guests?.adults} adult, {guestInfo?.guests?.children} children
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Check in</p>
            <p className="font-medium">{checkInDate}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Check out</p>
            <p className="font-medium">{checkOutDate}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="font-medium">{guestInfo?.userId?.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Phone number</p>
            <p className="font-medium">{guestInfo?.userId?.emergencyPhone}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Room Number</p>
            <p className="font-medium">Room #{guestInfo?.roomId?.roomNumber}</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">Checkout</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Checkout</DialogTitle>
              <DialogDescription>Are you sure you want to proceed with checking out this guest? This action cannot be undone.</DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2 ">
              <Button disabled={loading} onClick={() => handleUpdateStatus('cancelled')} variant={'outline'} className="border px-4 ">
                Cancel
              </Button>
              <Button disabled={loading} onClick={() => handleUpdateStatus('checked_out')} className="px-4 bg-[#2563EB] hover:bg-[#274b9a] ">
                Confirm
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
