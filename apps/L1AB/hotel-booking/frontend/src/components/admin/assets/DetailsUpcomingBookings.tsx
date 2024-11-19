
'use client';
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow,  } from '@/components/ui/table';
import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import { RxCountdownTimer } from 'react-icons/rx';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
//   SelectGroup
// } from "@/components/ui/select"



export const DetailsUpcomingBookings = () => {
  // Mock data for upcoming bookings
  // const mockBookings = [
  //   { id: 1, guestName: 'John Doe', status: 'Confirmed', date: '2024-12-15' },
  //   { id: 2, guestName: 'Jane Smith', status: 'Pending', date: '2024-12-20' },
  //   { id: 3, guestName: 'Emily White', status: 'Confirmed', date: '2024-12-25' },
  //   { id: 4, guestName: 'Michael Brown', status: 'Cancelled', date: '2025-01-05' },
  // ];

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-lg font-normal text-black">Upcoming Booking</h1>
      <div className='flex flex-col rounded-t-md overflow-hidden w-full'>
      <Table className='w-full'>
        <TableCaption>
          <p className="text-gray-600 h-[18px] w-[18px] mb-4 text-lg">
            <RxCountdownTimer />
          </p>
          <h1 className="text-black">Upcoming Bookings</h1>
          <p>Your future bookings will appear here once confirmed.</p>
        </TableCaption>

        <TableHeader className='bg-[#f4f4f5] border w-full'>
          <TableRow className='w-full border-b'>
            <TableHead className="text-black p-3 w-[82px] text-center border-r">ID</TableHead>
            <TableHead className="text-black p-3 text-center w-[278px] border-r">Guest Name</TableHead>
            <TableHead className="text-black p-3 w-[188px] border-r">
              {/* <Select>
              <div className="flex gap-2 justify-center items-center">
                <SelectValue placeholder="Status"></SelectValue>
                <div className="text-sm flex flex-col justify-center items-center gap-0 h-4 w-4">
                <SelectTrigger className='w-2 bg-transparent'><IoIosArrowUp />
                <IoIosArrowDown />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='Confirmed'> Confirmed</SelectItem>
                    <SelectItem value='Pending'> Pending</SelectItem>
                    <SelectItem value='Cancelled'> Cancelled</SelectItem>
                  </SelectGroup>
                </SelectContent>
                </div>
              </div>
              </Select> */}
            </TableHead>
            <TableHead className="w-[188px] text-black p-3 border-r">
              <div className="flex gap-2 justify-center items-center">
                <p>Date</p>
                <div className="text-sm flex flex-col justify-center items-center gap-0 h-4 w-4">
                  <IoIosArrowUp />
                  <IoIosArrowDown />
                </div>
              </div>
            </TableHead>
          </TableRow>
        
        </TableHeader>
        <TableBody>
          {/* {mockBookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 p-3">
                No upcoming bookings available.
              </TableCell>
            </TableRow>
          ) : (
            mockBookings.map((booking) => (
              <TableRow key={booking.id} className="border-b w-full">
                <TableCell className="p-3 text-center w-[82px] border-l border-r border-b">{booking.id}</TableCell>
                <TableCell className="p-3 text-center w-[278px] border-r border-b">{booking.guestName}</TableCell>
                <TableCell className="p-3 text-center w-[188px] border-r border-b">{booking.status}</TableCell>
                <TableCell className="p-3 text-center w-[188px] border-r border-b">{booking.date}</TableCell>
              </TableRow>
            ))
          )} */}
        </TableBody>
        
      </Table>
      </div>
    </div>
  );
};
