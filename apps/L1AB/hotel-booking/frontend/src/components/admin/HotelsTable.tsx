'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { HotelsSearchBar } from './assets';
import { useGetAllHotelsQuery } from '@/generated';
import { StarIcon } from '../icon';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HotelNameDialog } from './dialogs';

export const HotelsTable = () => {
  const { data } = useGetAllHotelsQuery();
  const router = useRouter();
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold">Hotels</h3>
        <HotelNameDialog />
      </div>
      <HotelsSearchBar />
      <div className="border rounded-md overflow-hidden">
        <Table className="bg-white text-foreground">
          <TableHeader>
            <TableRow>
              <TableHead className="w-24 border-r">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[420px] border-x">Rooms</TableHead>
              <TableHead className="w-28">Stars Rating</TableHead>
              <TableHead className="w-28 border-l">User Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.getAllHotels.map((hotel) => {
              // const totalRooms = hotel.rooms ?? [];
              return (
                <TableRow data-testid="one-hotel" key={hotel._id} onClick={() => router.push(`/admin/hotels/${hotel._id}`)} className="cursor-pointer">
                  <TableCell className="font-medium border-r">{hotel._id}</TableCell>
                  <TableCell className="flex items-center gap-2 py-2">
                    <div className="w-12 h-12 rounded-md relative overflow-hidden object-cover">
                      <Image src={hotel.images[0]} alt={hotel.name} fill></Image>
                    </div>
                    <p>{hotel.name}</p>
                  </TableCell>
                  <TableCell className="border space-x-2">
                    {hotel.rooms?.map((room, index) => {
                      if (index <= 2)
                        return (
                          <span key={index} className="px-4 py-1 text-sm font-medium text-black bg-gray-100 rounded-full shadow">
                            {room.name}
                          </span>
                        );
                    })}
                    {/* {totalRooms.length > 3 && <span className="px-4 py-1 text-sm font-medium text-black bg-gray-100 rounded-full shadow">+{totalRooms - 3}</span>} */}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <StarIcon />
                      <span>{hotel.stars}</span>
                    </div>
                  </TableCell>
                  <TableCell className="border-l">
                    {hotel.rating}
                    <span className="text-muted-foreground">/10</span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
