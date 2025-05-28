import { Button } from '@/components/ui/button';
import { Booking } from '@/generated';
import Image from 'next/image';
import React from 'react';

export const RoomPriceDetail = ({ guestInfo, nights }: { guestInfo: Booking | null | undefined; nights: number }) => {
  return (
    <div className="space-y-6 max-w-[440px] w-full">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{guestInfo?.roomId?.type}</h2>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0">
              View
            </Button>
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src={typeof guestInfo?.hotelId?.images?.[0] === 'string' ? guestInfo?.hotelId.images[0] : '/placeholder.svg'}
              alt="Room"
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Price Detail</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm">{nights} night</p>
                <p className="text-sm text-gray-500">{guestInfo?.roomId?.pricePerNight}₮ per night</p>
              </div>
              <p className="font-medium">{guestInfo?.roomId?.pricePerNight}₮</p>
            </div>

            <div className="flex justify-between">
              <p>Taxes</p>
              <p className="font-medium">0₮</p>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between">
                <p className="font-medium">Total price</p>
                <p className="font-bold text-lg">{guestInfo?.totalPrice}₮</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
