
'use client';
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { RxCountdownTimer } from 'react-icons/rx';
import { useState } from 'react';

type BookingType = {
  _id: number;
  guestName: string;
  status: string;
  date: string;
}

type DetailsUpcomingBookingsPropsType = { 
  mockBookings: BookingType[]
}

export const DetailsUpcomingBookings = ( { mockBookings }: DetailsUpcomingBookingsPropsType) => {
  const [statusFilter, setStatusFilter] = useState<'Confirmed' | 'Pending' | 'Cancelled' | ''>(''); // Default no filter
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc'); // Sort by Date or ID

  // Filter based on the selected status
  const filteredBookings = mockBookings.filter((booking) => {
    if (statusFilter === '') return true; // Show all if no status is selected
    return booking.status === statusFilter;
  });

  // Sort bookings by date or ID
  const sortedBookings = filteredBookings.sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.date.localeCompare(b.date); // Sort by date
    } else {
      return b.date.localeCompare(a.date); // Sort by date in descending order
    }
  });

  const handleSort = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  // Handle status change (cycling through statuses)
  const cycleStatus = () => {
    const statuses: ('Confirmed' | 'Pending' | 'Cancelled' | '')[] = ['', 'Confirmed', 'Pending', 'Cancelled'];
    const currentIndex = statuses.indexOf(statusFilter);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    setStatusFilter(nextStatus);
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-lg font-normal text-black">Upcoming Booking</h1>
      <div className="flex flex-col rounded-t-md overflow-hidden w-full">
        <Table className="w-full">
          <TableCaption>
            
          </TableCaption>

          <TableHeader className="bg-[#f4f4f5] border w-full">
            <TableRow className="w-full border-b">
              <TableHead className="text-black p-3 w-[82px] text-center border-r">ID</TableHead>
              <TableHead className="text-black p-3 text-center w-[278px] border-r">Guest Name</TableHead>
              <TableHead className="text-black p-3 w-[188px] border-r">
                <div className="flex gap-2 justify-center items-center">
                  <p>Status</p>
                  <div className="flex flex-col h-4 w-4">
                    <IoIosArrowUp
                      className="text-black cursor-pointer"
                      data-testid="arrow-up-status"

                      onClick={cycleStatus}
                    />
                    <IoIosArrowDown
                      className="text-black cursor-pointer"
                      data-testid="arrow-down-status"

                      onClick={cycleStatus}
                    />
                  </div>
                </div>
              </TableHead>
              <TableHead className="w-[188px] text-black p-3 border-r">
                <div className="flex gap-2 justify-center items-center">
                  <p>Date</p>
                  <div className="text-sm flex flex-col justify-center items-center gap-0 h-4 w-4">
                    <IoIosArrowUp onClick={handleSort}   data-testid="arrow-up-date"
                    />
                    <IoIosArrowDown onClick={handleSort}   data-testid="arrow-down-date"
 />
                  </div>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedBookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500 p-3">
                <p className="text-gray-600 h-[18px] w-[18px] mb-4 text-lg">
              <RxCountdownTimer />
            </p>
            <h1 className="text-black">Upcoming Bookings</h1>
            <p>Your future bookings will appear here once confirmed.</p>
                </TableCell>
              </TableRow>
            ) : (
              sortedBookings.map((booking) => (
                <TableRow key={booking._id} className="border-b w-full">
                  <TableCell className="p-3 text-center w-[82px] border-l border-r border-b">{booking._id}</TableCell>
                  <TableCell className="p-3 text-center w-[278px] border-r border-b">{booking.guestName}</TableCell>
                  <TableCell className="p-3 text-center w-[188px] border-r border-b">{booking.status}</TableCell>
                  <TableCell className="p-3 text-center w-[188px] border-r border-b">{booking.date}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
