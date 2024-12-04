'use client';
import React from 'react';
import { Container } from './assets';
import { PopularHotelsCard } from './assets/PopularHotelsCard';
import { Button } from '@/components/ui/button';
import { useGetAllHotelsQuery } from '@/generated';

export const HotelsGrid = () => {
  const { data } = useGetAllHotelsQuery();
  return (
    <Container backgroundColor="bg-white">
      <div className="flex justify-between mt-8 mb-4">
        <h1 className="text-2xl font-semibold">Popular Hotels</h1>
        <Button className="text-black bg-white border hover:bg-gray-100">View all</Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {data?.getAllHotels.map((hotel, index) => (
          <PopularHotelsCard key={index} id={hotel._id} image={hotel.images[0]} name={hotel.name} stars={hotel.stars} rating={hotel.rating} />
        ))}
      </div>
    </Container>
  );
};
