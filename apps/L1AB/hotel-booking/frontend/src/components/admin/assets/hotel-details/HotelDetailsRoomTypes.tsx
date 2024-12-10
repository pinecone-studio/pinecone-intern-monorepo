'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetAllRoomsQuery } from '@/generated';
import { DoorClosed } from 'lucide-react';

export const HotelDetailsRoomTypes = () => {
  const [activeTab, setActiveTab] = React.useState('ALL');
  const { data, loading, error } = useGetAllRoomsQuery();
  const RoomDetails = data?.getAllRooms;

  const filteredRooms = activeTab === 'ALL' ? RoomDetails : RoomDetails?.filter((room) => room.roomType === activeTab);

  if (loading) {
    return <div>Loading rooms...</div>;
  }

  if (error) {
    return <div>Failed to load rooms. Please try again later.</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="font-semibold mb-6 text-lg">Room Types</div>
        <Button className="border-none text-[#2563EB]" variant="outline">
          + Add Room
        </Button>
      </div>
      <Tabs data-testid="" value={activeTab} onValueChange={setActiveTab} className="w-[223px] mb-4">
        <TabsList>
          <TabsTrigger data-testid="tab-trigger-ALL" value="ALL">
            All Rooms
          </TabsTrigger>
          <TabsTrigger data-testid="tab-trigger-ONE" value="ONE">
            1 Bed
          </TabsTrigger>
          <TabsTrigger data-testid="tab-trigger-TWO" value="TWO">
            2 Beds
          </TabsTrigger>
          <TabsTrigger data-testid="tab-trigger-MORE" value="MORE">
            3 or More Beds
          </TabsTrigger>
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
              filteredRooms.map((room, index) => (
                <TableRow data-testid={`room-item${index}`} key={room._id}>
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
