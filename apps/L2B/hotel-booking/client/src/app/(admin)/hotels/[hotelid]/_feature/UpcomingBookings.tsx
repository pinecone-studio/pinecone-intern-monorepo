'use client';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Booking, useUpcomingBookingsQuery } from '@/generated';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  hotelId: string;
};

export const UpcomingBookings = ({ hotelId }: Props) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { data } = useUpcomingBookingsQuery();
  const router = useRouter();

  useEffect(() => {
    if (data?.upcomingBookings) {
      const filteredBookings = data.upcomingBookings.filter((booking) => booking.hotelId?._id === hotelId);
      setBookings(filteredBookings);
    }
  }, [data?.upcomingBookings, hotelId]);

  return (
    <div className="p-6 max-w-[784px] w-full rounded-[8px] border bg-background ">
      <h2 className="text-2xl font-bold mb-4">Upcoming Bookings</h2>
      <Table className="h-max rounded-md border w-full ">
        <TableHeader>
          <TableRow>
            <TableHead className="border-r-[1px] font-bold">ID</TableHead>
            <TableHead className="border-r-[1px] font-bold">Guest</TableHead>
            <TableHead className="border-r-[1px] font-bold">
              <div className="flex items-center justify-between">
                Date
                <Button variant="ghost" size="icon" className="flex flex-col px-1 h-6 w-6">
                  <ChevronUp className="w-3 h-3" />
                  <ChevronDown className="w-3 h-3 -mt-1" />
                </Button>
              </div>
            </TableHead>
            <TableHead className="border-r-[1px] font-bold">
              <div className="flex items-center justify-between">
                Rooms
                <Button variant="ghost" size="icon" className="flex flex-col px-1 h-6 w-6">
                  <ChevronUp className="w-3 h-3" />
                  <ChevronDown className="w-3 h-3 -mt-1" />
                </Button>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {bookings.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No upcoming bookings
              </TableCell>
            </TableRow>
          )}
          {bookings.map((booking) => (
            <TableRow key={booking._id} className="cursor-pointer " onClick={() => router.push(`/hotels/${booking.hotelId?._id}/${booking.roomId?._id}/${booking._id}`)}>
              <TableCell className="border-r-[1px]">{booking._id.slice(-4).toUpperCase()}</TableCell>
              <TableCell className="border-r-[1px]">
                <div className="font-medium text-sm">{booking.userId?.firstName || 'Unknown Guest'}</div>
                <div className="text-sm text-muted-foreground">
                  ({booking.guests.adults} adult{booking.guests.adults > 1 ? 's' : ''}, {booking.guests.children} children)
                </div>
              </TableCell>
              <TableCell className="text-sm border-r-[1px]">
                {new Date(booking.checkInDate).toLocaleDateString()} – {new Date(booking.checkOutDate).toLocaleDateString()}
                <span className="text-muted-foreground">
                  ({Math.ceil((new Date(booking.checkOutDate).getTime() - new Date(booking.checkInDate).getTime()) / (1000 * 3600 * 24))} night
                  {Math.ceil((new Date(booking.checkOutDate).getTime() - new Date(booking.checkInDate).getTime()) / (1000 * 3600 * 24)) > 1 ? 's' : ''})
                </span>
              </TableCell>
              <TableCell className="text-sm">{booking.roomId?.name || 'Unknown Room'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
