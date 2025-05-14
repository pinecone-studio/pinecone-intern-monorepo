import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import { GuestInfo } from '../_feature/GuestDetail';

export const RoomPriceDetail = ({ guestInfo, totalPrice }: { guestInfo: GuestInfo; totalPrice: number }) => {
  return (
    <div className="space-y-6 max-w-[440px] w-full">
      {/* Room Details */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{guestInfo.roomType}</h2>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0">
              View
            </Button>
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image src={guestInfo.roomImage || '/placeholder.svg'} alt="Room" width={300} height={200} className="w-full h-48 object-cover" />
          </div>
        </div>
      </div>

      {/* Price Details */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Price Detail</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm">{guestInfo.nights} night</p>
                <p className="text-sm text-gray-500">
                  {guestInfo.pricePerNight.toLocaleString()}
                  {guestInfo.currency} per night
                </p>
              </div>
              <p className="font-medium">
                {guestInfo.pricePerNight.toLocaleString()}
                {guestInfo.currency}
              </p>
            </div>

            <div className="flex justify-between">
              <p>Taxes</p>
              <p className="font-medium">
                {guestInfo.taxes.toLocaleString()}
                {guestInfo.currency}
              </p>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between">
                <p className="font-medium">Total price</p>
                <p className="font-bold text-lg">
                  {totalPrice.toLocaleString()}
                  {guestInfo.currency}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
