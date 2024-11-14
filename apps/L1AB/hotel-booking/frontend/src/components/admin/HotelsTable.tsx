import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FaPlus } from 'react-icons/fa6';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FaRegStar } from 'react-icons/fa';
import { HotelsSearchBar } from './assets';
const hotels = [
  {
    _id: '6735173cb5895ffa4530c104',
    paymentStatus: 'Paid',
    totalAmount: 8,
    paymentMethod: 5,
  },
  {
    _id: '6735173cb5895ffa4530c105',
    paymentStatus: 'Pending',
    totalAmount: 1.2,
    paymentMethod: 3,
  },
];
export const HotelsTable = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold">Hotels</h3>
        <Button className="bg-blue-600 space-x-2 px-8">
          <FaPlus />
          <span>Add Hotel</span>
        </Button>
      </div>
      <HotelsSearchBar />
      <div className="border rounded-md overflow-hidden">
        <Table className="bg-white text-foreground">
          <TableHeader>
            <TableRow>
              <TableHead className="w-24 border-r">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-80 border-x">Rooms</TableHead>
              <TableHead className="w-28">Stars Rating</TableHead>
              <TableHead className="w-28 border-l">User Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotels.map((hotel) => (
              <TableRow key={hotel._id}>
                <TableCell className="font-medium border-r">{hotel._id}</TableCell>
                <TableCell className="flex items-center gap-2 py-2">
                  <div className="size-12 bg-green-500 rounded-md"></div>
                  <p>{hotel.paymentStatus}</p>
                </TableCell>
                <TableCell className="border space-x-2">
                  <Badge variant="secondary">Single</Badge>
                  <Badge variant="secondary">Deluxe</Badge>
                  <Badge variant="secondary">Standard</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FaRegStar />
                    <span>{hotel.paymentMethod}</span>
                  </div>
                </TableCell>
                <TableCell className="border-l">
                  {hotel.totalAmount}
                  <span className="text-muted-foreground">/10</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
