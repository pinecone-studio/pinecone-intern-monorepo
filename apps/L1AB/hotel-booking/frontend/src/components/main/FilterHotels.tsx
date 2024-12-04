'use client';

import React from 'react';
import { Container, FilterHotelCard } from './assets';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useGetAllHotelsQuery } from '@/generated';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const FilterHotels = () => {
  const { data } = useGetAllHotelsQuery();
  return (
    <Container backgroundColor="bg-white">
      <div className="py-8 px-[60px] flex justify-between gap-12 w-full">
        <div className="min-w-[240px] space-y-2">
          <p>Search by property name</p>
          <Input placeholder="Search" />
          <div className="py-4">
            <div className="border-b"></div>
          </div>
          <div className="space-y-8">
            <RadioGroup className="space-y-5 text-sm">
              <p>Rating</p>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="plus-9" id="plus-9" />
                <Label htmlFor="plus-9">+9</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="plus-8" id="plus-8" />
                <Label htmlFor="plus-8">+8</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="plus-7" id="plus-7" />
                <Label htmlFor="plus-7">+7</Label>
              </div>
            </RadioGroup>
            <RadioGroup className="space-y-5 text-sm">
              <p>Stars</p>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5-stars" id="5-stars" />
                <Label htmlFor="5-stars">5 stars</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4-stars" id="4-stars" />
                <Label htmlFor="4-stars">4 stars</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3-stars" id="3-stars" />
                <Label htmlFor="3-stars">3 stars</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2-stars" id="2-stars" />
                <Label htmlFor="2-stars">2 stars</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1-star" id="1-star" />
                <Label htmlFor="1-star">1 star</Label>
              </div>
            </RadioGroup>
            <RadioGroup className="space-y-5 text-sm">
              <p>Amenities</p>
              <div className="flex items-center space-x-2">
                <RadioGroupItem className="rounded-sm" value="pool" id="pool" />
                <Label htmlFor="pool">Pool</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem className="rounded-sm" value="pet-friendly" id="pet-friendly" />
                <Label htmlFor="pet-friendly">Pet-friendly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem className="rounded-sm" value="airport-shuttle" id="airport-shuttle" />
                <Label htmlFor="airport-shuttle">Airport shuttle</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="w-full space-y-4">
          <div className="flex justify-between">
            <p>{data?.getAllHotels.length} properties</p>
            <Select>
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="filter" defaultValue={'Recommended'} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Recommended">Recommended</SelectItem>
                  <SelectItem value="Price-LowToHigh">Price: Low to High</SelectItem>
                  <SelectItem value="Price-HighToLow">Price: High to Low</SelectItem>
                  <SelectItem value="StarRating">Star Rating</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full flex flex-col gap-4">
            {data?.getAllHotels.map((item, index) => (
              <FilterHotelCard key={index} id={item._id} name={item.name} image={item.images[0]} stars={item.stars} rating={item.rating} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};
