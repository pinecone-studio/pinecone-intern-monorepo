'use client';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useUpcomingBookingsQuery } from '@/generated';
import { ChevronDown, ChevronUp } from 'lucide-react';

type Props = {
  hotelId: string;
};

export const UpcomingBookings = ({ hotelId }: Props) => {
  const { data } = useUpcomingBookingsQuery();
  console.log('upcomingBookings', data);
  console.log('hotelId:', hotelId);

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
          {data?.upcomingBookings.map((booking) => (
            <TableRow key={booking._id}>
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
