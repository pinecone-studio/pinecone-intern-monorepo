"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { IoIosArrowUp } from "react-icons/io";
  import { IoIosArrowDown } from "react-icons/io";
  

export const DetailsUpcomingBookings =()=>{
    return(
        <div className="flex flex-col gap-3"> 
        <h1 className="text-lg font-normal text-black">Upcoming Booking</h1>
        
        <Table >
  <TableCaption>
   <h1 className="text-black">No Upcoming Bookings</h1> 
    <p>You currently have no upcoming stays. Your future bookings will appear here once confirmed.</p></TableCaption>
  <TableHeader className="bg-[#f4f4f5] border border-1 ">
    <TableRow className="border sm:rounded-md">
      <TableHead className="w-[82px] border-r text-black">ID</TableHead>
      <TableHead className="w-[346px] border-r text-black">Guest Name</TableHead>
      <TableHead className="w-[120px] border-r text-black">
        <div className="flex gap-2 justify-center items-center">
        <p>Status</p> 
        <div className="text-sm flex flex-col justify-center items-center gap-0 h-4 w-4"><IoIosArrowUp />
      <IoIosArrowDown />
      </div>
      </div></TableHead>
      <TableHead className="w-[188px] text-black"><div className="flex gap-2 justify-center items-center">
        <p>Date</p> 
        <div className="text-sm flex flex-col justify-center items-center gap-0 h-4 w-4"><IoIosArrowUp />
      <IoIosArrowDown />
      </div>
      </div></TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell> data</TableCell>
      <TableCell>data</TableCell>
      <TableCell>data</TableCell>
      <TableCell >data</TableCell>
    </TableRow>
  </TableBody>
</Table>

        </div>
       
    )
}