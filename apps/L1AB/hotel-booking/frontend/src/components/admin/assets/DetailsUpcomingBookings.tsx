'use client';
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import { RxCountdownTimer } from 'react-icons/rx';

export const DetailsUpcomingBookings = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-lg font-normal text-black">Upcoming Booking</h1>

      <Table>
        <TableCaption>
          <p className="text-gray-600 h-[18px] w-[18px] mb-4 text-lg">
            <RxCountdownTimer />
          </p>
          <h1 className="text-black">No Upcoming Bookings</h1>
          <p>You currently have no upcoming stays. Your future bookings will appear here once confirmed.</p>
        </TableCaption>
        <div className="rounded-t-md overflow-hidden bg-[#f4f4f5] w-full flex">
          <TableHeader className="w-full">
            <TableRow className="border flex justify-between items-center">
              <TableHead className=" border-r text-black p-3">ID</TableHead>
              <TableHead className=" border-r text-black p-3">Guest Name</TableHead>
              <TableHead className=" border-r text-black p-3">
                <div className="flex gap-2 justify-center items-center">
                  <p>Status</p>
                  <div className="text-sm flex flex-col justify-center items-center gap-0 h-4 w-4">
                    <IoIosArrowUp />
                    <IoIosArrowDown />
                  </div>
                </div>
              </TableHead>
              <TableHead className="w-[188px] text-black">
                <div className="flex gap-2 justify-center items-center p-3">
                  <p>Date</p>
                  <div className="text-sm flex flex-col justify-center items-center gap-0 h-4 w-4">
                    <IoIosArrowUp />
                    <IoIosArrowDown />
                  </div>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
        </div>
        <TableBody></TableBody>
      </Table>
    </div>
  );
};
