'use client';
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const invoices = [
  {
    ID: '001',
    Name: 'Baatar Erdenebat',
    Hotel: 'Chingis Khan Hotel',
    Rooms: 'Economy Double Room, City View',
    Guests: '1 Adult',
    Date: 'Nov 5 - Nov 7',
    Status: 'Booked',
  },
  {
    ID: '002',
    Name: 'Tsetsenbayar Munkhbat',
    Hotel: 'Chingis Khan Hotel',
    Rooms: 'Standard Twin Room, City View',
    Guests: '2 Adult',
    Date: 'Jan 10 - Jan 12',
    Status: 'Completed',
  },
  {
    ID: '003',
    Name: 'Munkhbayar Tserendorj',
    Hotel: 'Chingis Khan Hotel',
    Rooms: 'Deluxe Twin Room, City View',
    Guests: '2 Adult',
    Date: 'Jul 4 - Jul 6',

    Status: 'Cancelled',
  },
  {
    ID: '004',
    Name: 'Sarnai Erdenetsetsegd',
    Hotel: 'Chingis Khan Hotel',
    Rooms: 'Economy Double Room, City View',
    Guests: '1 Adult',
    Date: 'Dec 5 - Dec 7',
    Status: 'Cancelled',
  },
  {
    ID: '005',
    Name: 'Nomin Erdenebold',
    Hotel: 'Chingis Khan Hotel',
    Rooms: 'Deluxe Twin Room, City View',
    Guests: '2 Adult',
    Date: 'May 30 - Jun 1',
    Status: 'Completed',
  },
];
export const GuestsTable = () => {
  return (
    <div className=" p-3 flex flex-col">
      <div className="my-4">Guests</div>
      <div className="flex gap-4 my-4">
        <div className="flex w-full">
          <Button variant="outline" className="border border-[#d6d6df] text-[#71717A] w-full justify-start">
            Search
          </Button>
        </div>
        <div className="flex">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <div className="flex gap-2 justify-center items-center text-[#71717A] p-1">
                <ChevronDown />
                Search option...
              </div>
              <div className=" flex px-4 gap-3">
                <div className="h-full w-full border border-[#9797aa]"></div>
              </div>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Booked">Booked</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
              <SelectItem value="Visited">Visited</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Hotel</TableHead>
              <TableHead>Rooms</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.ID}>
                <TableCell className="font-medium">{invoice.ID}</TableCell>
                <TableCell>{invoice.Name}</TableCell>
                <TableCell>{invoice.Hotel}</TableCell>
                <TableCell>{invoice.Rooms}</TableCell>
                <TableCell>{invoice.Guests}</TableCell>
                <TableCell>{invoice.Date}</TableCell>
                <TableCell className="">
                  <button className="bg-[#2563EB] p-2 rounded-xl text-[#FAFAFA]">{invoice.Status}</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between p-6 ">
          <div className="text-[#F4F4F5]">.</div>
          <div className="flex flex-row gap-4">
            <div>
              <h1> Page 1 of 10</h1>
            </div>
            <div className="flex gap-2 ">
              <button className="w-[32px] h-[32px] border flex justify-center items-center rounded-md">
                <ChevronsLeft />
              </button>
              <button className="w-[32px] h-[32px] border flex justify-center items-center rounded-md">
                <ChevronLeft />
              </button>
              <button className="w-[32px] h-[32px] border flex justify-center items-center rounded-md">
                <ChevronRight />
              </button>
              <button className="w-[32px] h-[32px] border flex justify-center items-center rounded-md">
                <ChevronsRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
