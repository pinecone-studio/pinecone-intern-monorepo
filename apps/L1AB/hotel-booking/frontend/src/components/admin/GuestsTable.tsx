'use client';
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, SearchIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';

const invoices = [
  { ID: '001', Name: 'Baatar Erdenebat', Hotel: 'Chingis Khan Hotel', Rooms: 'Economy Double Room, City View', Guests: '1 Adult', Date: 'Nov 5 - Nov 7', Status: 'Booked' },
  { ID: '002', Name: 'Tsetsenbayar Munkhbat', Hotel: 'Chingis Khan Hotel', Rooms: 'Standard Twin Room, City View', Guests: '2 Adult', Date: 'Jan 10 - Jan 12', Status: 'Completed' },
  { ID: '003', Name: 'Munkhbayar Tserendorj', Hotel: 'Chingis Khan Hotel', Rooms: 'Deluxe Twin Room, City View', Guests: '2 Adult', Date: 'Jul 4 - Jul 6', Status: 'Cancelled' },
  { ID: '004', Name: 'Sarnai Erdenetsetsegd', Hotel: 'Chingis Khan Hotel', Rooms: 'Economy Double Room, City View', Guests: '1 Adult', Date: 'Dec 5 - Dec 7', Status: 'Cancelled' },
  { ID: '005', Name: 'Nomin Erdenebold', Hotel: 'Chingis Khan Hotel', Rooms: 'Deluxe Twin Room, City View', Guests: '2 Adult', Date: 'May 30 - Jun 1', Status: 'Completed' },
];

const badgeStyles = {
  booked: 'bg-[#2563EB]',
  cancelled: 'bg-[#FFA500]',
  completed: 'bg-[#18BA51]',
};

export const GuestsTable = () => {
  const itemsPerPage = 1; 
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(invoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInvoices = invoices.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return; 
    setCurrentPage(page);
  };

  return (
    <div className="p-3 flex flex-col">
      <div className="my-4">Guests</div>
      <div className="flex gap-4 my-4">
        <div className="flex w-full">
          <Input placeholder="Search" />
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="flex flex-col w-[232px] items-start rounded-md border-[1px] border-[#E4E4E7] shadow-md">
              <div className="border-b-[1px] border-[#E4E4E7] flex items-center gap-2 px-3">
                <SearchIcon size={20} color="#71717A" />
                <Input placeholder="Search Option..." className="focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none border-transparent" />
              </div>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Booked">Booked</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
              <SelectItem value="Visited">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table className="bg-white text-foreground">
          <TableHeader>
            <TableRow>
              <TableHead className="border-r">ID</TableHead>
              <TableHead className="border-r">Name</TableHead>
              <TableHead className="border-r">Hotel</TableHead>
              <TableHead className="border-r">Rooms</TableHead>
              <TableHead className="border-r">Guests</TableHead>
              <TableHead className="border-r">Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentInvoices.map((invoice) => (
              <TableRow key={invoice.ID} className="cursor-pointer">
                <TableCell className="font-medium border-r">{invoice.ID}</TableCell>
                <TableCell className="border-r">{invoice.Name}</TableCell>
                <TableCell className="border-r">{invoice.Hotel}</TableCell>
                <TableCell className="border-r">{invoice.Rooms}</TableCell>
                <TableCell className="border-r">{invoice.Guests}</TableCell>
                <TableCell className="border-r">{invoice.Date}</TableCell>
                <TableCell className="">
                  <Badge className={invoice.Status === 'Booked' ? badgeStyles.booked : invoice.Status === 'Cancelled' ? badgeStyles.cancelled : badgeStyles.completed}>{invoice.Status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-self-end px-2 py-4">
          <Pagination>
            <PaginationContent className="gap-8">
              <PaginationItem>
                Page {currentPage} of {totalPages}
              </PaginationItem>
              <div className='flex gap-2'>
              <PaginationItem data-testid="jump-to-start" className="p-4 rounded-md border-[1px] border-[#E4E4E7] cursor-pointer" onClick={() => handlePageChange(1)}>
                <ChevronsLeft size={16} />
              </PaginationItem>
              <PaginationItem data-testid="jump-to-previous" className="p-4 rounded-md border-[1px] border-[#E4E4E7] cursor-pointer" onClick={() => handlePageChange(currentPage - 1)}>
                <ChevronLeft size={16} />
              </PaginationItem>
              <PaginationItem data-testid="jump-to-next" className="p-4 rounded-md border-[1px] border-[#E4E4E7] cursor-pointer" onClick={() => handlePageChange(currentPage + 1)}>
                <ChevronRight size={16} />
              </PaginationItem>
              <PaginationItem data-testid="jump-to-end" className="p-4 rounded-md border-[1px] border-[#E4E4E7] cursor-pointer" onClick={() => handlePageChange(totalPages)}>
                <ChevronsRight size={16} />
              </PaginationItem>
              </div>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};
