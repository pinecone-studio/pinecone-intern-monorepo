'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StarFillIcon } from '@/components/icon';

type FilterHotelCardProps = {
  id: string;
  name: string;
  image: string;
  rating: number;
  stars: number;
};
export const FilterHotelCard = ({ id, name, image, rating, stars }: FilterHotelCardProps) => {
  return (
    <Link data-testid="filter-hotel-card" href={`/hotels/${id}`}>
      <div className="flex w-full rounded-md border overflow-hidden">
        <div className="min-w-[396px] h-56 relative">
          <Image src={image} alt={name} fill></Image>
        </div>
        <div className="p-5 flex flex-col justify-between w-full">
          <div className="space-y-2">
            <h3 className="font-bold">{name}</h3>
            <div className="flex gap-1">
              {Array.from({ length: stars }).map((_, index) => (
                <StarFillIcon key={index} />
              ))}
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex gap-2 items-center">
              <div className="font-semibold bg-blue-600 rounded-full text-xs px-[10px] py-[2px] w-fit text-white">{rating}</div>
              <p>Excellent</p>
            </div>
            <div className="space-y-1 text-end">
              <div>
                <p className="text-muted-foreground text-xs">Per night</p>
                <h6 className="text-xl">150,000₮</h6>
              </div>
              <p className="text-xs">210,000₮ total</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
