'use client';
import React, { useState } from 'react';
import { Container } from './assets';
import { HotelDetailsMock } from './assets/HotelDetailsMock';
import { HotelDetailsImages } from './assets/HotelDetailsImages';
import { HotelDetailsComponent } from './assets/HotelDetailsComponent';
import { useGetHotelByIdQuery } from '@/generated';
import { useParams } from 'next/navigation';
import { RiArrowRightSLine } from 'react-icons/ri';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HotelDetailsAmenities, mockAmenities } from './assets/HotelamenitiesMock';

export const HotelDetails = () => {
  const { hotel } = useParams();
  const { data } = useGetHotelByIdQuery({ variables: { id: hotel as string } });
  const hotelDetails = data?.getHotelById;
  const hotelRooms = hotelDetails?.rooms;
  const [activeTab, setActiveTab] = useState('ALL');

  const filteredRooms = activeTab === 'ALL' ? hotelRooms : hotelRooms?.filter((room) => room.roomType === activeTab);

  if (!hotelRooms) {
    return <p className="text-center text-gray-500">Loading hotel details...</p>;
  }

  return (
    <Container backgroundColor="bg-white">
      <div className="px-[60px] py-8 space-y-8">
        <HotelDetailsImages images={hotelDetails.images} />
        <div className="space-y-14">
          <HotelDetailsComponent
            name={hotelDetails.name}
            phone={hotelDetails.phone}
            desc={hotelDetails.description}
            rating={hotelDetails.rating}
            stars={hotelDetails.stars}
            location={hotelDetails.address}
          />
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-2xl" data-testid="choose-room-title">
              Choose your room
            </h1>
            <Tabs data-testid="" value={activeTab} onValueChange={setActiveTab} className="w-[223px] mb-4">
              <TabsList>
                <TabsTrigger value="ALL">All Rooms</TabsTrigger>
                <TabsTrigger value="ONE">1 Bed</TabsTrigger>
                <TabsTrigger value="TWO">2 Beds</TabsTrigger>
                <TabsTrigger value="MORE">3 or More Beds</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="grid grid-cols-3 gap-4" data-testid="room-grid">
              {filteredRooms?.length ? (
                filteredRooms?.map((room, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden" data-testid={`room-${room._id}`}>
                    <div className="mb-4">
                      <div className="relative w-full h-[216px]">{room.photos?.[0] && <Image src={room.photos[0]} alt={`Room ${room.name}`} fill />}</div>
                    </div>
                    <div className="p-4">
                      <h2 className="text-base font-bold mb-2" data-testid={`room-name-${room._id}`}>
                        {room.name}, {room.description}
                      </h2>
                      <HotelDetailsAmenities amenities={mockAmenities} />
                      <p className="text-xs w-full border-t font-thin py-2 text-[#71717a]">Total</p>
                      <p className="text-xl font-medium text-gray-800">${(room.price + 150000).toLocaleString()}</p>
                      <p className="text-sm font-medium text-gray-800">Price per night: ${room.price.toLocaleString()}</p>
                      <div className="flex justify-between">
                        <div className="flex justify-center items-center gap-2">
                          <p className="text-xs text-[#2563eb]">Price detail</p>
                          <p>
                            <RiArrowRightSLine className="text-xs text-[#2563eb]" />
                          </p>
                        </div>
                        <Button className="w-[79px] h-[36px] bg-[#2563eb] text-xs">Reserve</Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No Room</div>
              )}
            </div>
          </div>
          <HotelDetailsMock />
        </div>
      </div>
    </Container>
  );
};

