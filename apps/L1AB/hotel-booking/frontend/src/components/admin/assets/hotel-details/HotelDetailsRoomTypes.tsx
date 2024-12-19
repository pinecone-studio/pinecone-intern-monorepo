'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DoorClosed } from 'lucide-react';

import { useAdmin } from '@/components/providers/AdminProvider';
import Link from 'next/link';

export const HotelDetailsRoomTypes = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const { hotelData, hotelLoading } = useAdmin();

  const hotelRooms = hotelData?.getHotelById.rooms;
  const filteredRooms = activeTab === 'ALL' ? hotelRooms : hotelRooms?.filter((room) => room.roomType === activeTab);

  if (hotelLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div data-testid="HotelDetailsRoomTypes" className="flex flex-col">
      <div className="flex justify-between">
        <div className="font-semibold mb-6 text-lg">Room Types</div>
        <Link href={hotelData?.getHotelById._id ? `/admin/hotels/${hotelData?.getHotelById._id}/addRoom` : '/admin/hotels/addHotel'}>
          <div className="text-[#2563EB] text-sm">+ Add Room</div>
        </Link>
      </div>
      <Tabs data-testid="" value={activeTab} onValueChange={setActiveTab} className="w-[223px] mb-4">
        <TabsList>
          <TabsTrigger value="ALL">All Rooms</TabsTrigger>
          <TabsTrigger value="ONE">1 Bed</TabsTrigger>
          <TabsTrigger value="TWO">2 Beds</TabsTrigger>
          <TabsTrigger value="MORE">3 or More Beds</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="border rounded overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary">
            <TableRow>
              <TableHead className="w-24 border-r text-black font-semibold">ID</TableHead>
              <TableHead className="text-black font-semibold">Name</TableHead>
              <TableHead className="w-44 border-x text-black font-semibold">Price</TableHead>
              <TableHead className="w-44 text-black font-semibold">Bed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRooms?.length ? (
              filteredRooms.map((room, _index) => (
                <TableRow data-testid={`room-item-${room._id}`} key={room._id}>
                  <TableCell className="border-r">{room._id}</TableCell>
                  <TableCell className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-200">
                      {room.photos?.length ? (
                        <Image src={room.photos[0]} alt="Room Photo" fill sizes="48px" />
                      ) : (
                        <span className="flex items-center justify-center text-sm text-gray-500">No Image</span>
                      )}
                    </div>
                    <p>{room.name}</p>
                  </TableCell>
                  <TableCell className="border-x">{room.price.toLocaleString()}₮</TableCell>
                  <TableCell>{room.roomType}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <div className="flex flex-col items-center">
                    <DoorClosed />
                    <div className="text-gray-500 text-sm">Room Types Not Set Up</div>
                    <div className="text-gray-400 text-xs mt-1">Define room types to help guests choose the best stay option.</div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
