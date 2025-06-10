'use client';
import { calculateNights, calculateTotalPrice, formatDate } from '@/utils/booking-form';
import { Zap } from 'lucide-react';
import Image from 'next/image';
import type React from 'react';

interface BookingSummaryProps {
  room: any;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  adults: number;
  childrenCount: number;
}

const renderServiceItem = (service: string) => (
  <div key={service} className="flex items-center gap-2">
    <Zap size={15} />
    <span className="text-sm">{service}</span>
  </div>
);

export const BookingSummary: React.FC<BookingSummaryProps> = ({ room, checkInDate, checkOutDate, adults, childrenCount }) => {
  if (!room || !checkInDate || !checkOutDate) return null;
  const nights = calculateNights(checkInDate, checkOutDate);
  const totalPrice = calculateTotalPrice(checkInDate, checkOutDate, room.pricePerNight);

  return (
    <div>
      <div className="bg-white border space-y-2 rounded-sm">
        <div>
          <Image width={1000} height={1000} src={room.images?.[0] || '/placeholder.svg'} alt={room.name} className="w-full h-48 object-cover" data-cy="room-image" />
          <div className="p-3">
            <h3 className="font-semibold text-lg" data-cy="hotel-name">
              {room.hotelId?.name}
            </h3>
            <p className="text-sm mb-2 text-[#71717A]" data-cy="hotel-location">
              {room.hotelId?.location}
            </p>
            <div className="flex items-center">
              <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs" data-cy="hotel-rating">
                {room.hotelId?.rating}
              </span>
              <span data-cy="hotel-rating-text" className="ml-2 text-sm">
                Excellent
              </span>
            </div>
          </div>
        </div>
        <div className="border-t pt-2 p-3">
          <div data-cy="check-in-date">
            <span className="text-sm text-[#71717A]">Check in</span>
            <p className="font-medium text-sm">{formatDate(checkInDate)}</p>
          </div>
          <div data-cy="check-out-date">
            <span className="text-sm text-[#71717A]">Check out</span>
            <p className="font-medium text-sm">{formatDate(checkOutDate)}</p>
          </div>
          <div>
            <span className="text-sm text-[#71717A]">Guests</span>
            <p className="font-medium text-sm" data-cy="guests">
              {adults} Adults, {childrenCount} Children
            </p>
          </div>
        </div>
        <div className="border-t pt-2 p-3">
          <h4 className="font-medium mb-2" data-cy="room-name">
            {room.name}
          </h4>
          <div className="flex gap-4">
            <div>
              {room.services?.bedroom?.slice(0, 1).map((service: string) => renderServiceItem(service))}
              {room.services?.foodAndDrink?.slice(0, 1).map((service: string) => renderServiceItem(service))}
            </div>
            <div>
              {room.services?.bathroom?.slice(0, 1).map((service: string) => renderServiceItem(service))}
              {room.services?.internet?.slice(0, 1).map((service: string) => renderServiceItem(service))}
            </div>
          </div>
        </div>
      </div>
      <div className="border rounded-sm mt-3 p-3">
        <h4 className="font-bold">Price Detail</h4>
        <div className="flex justify-between text-sm">
          <span>1 room × {nights} night</span>
          <span data-cy="price-per-night">{totalPrice.toFixed(2)}</span>
        </div>
        <span className="text-sm text-[#71717A]">{room?.pricePerNight} per night</span>
        <div className="flex justify-between font-semibold text-lg pt-2 mt-3 border-t">
          <span>Total price</span>
          <span data-cy="total-price">USD {totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
