'use client';

import React from 'react';
import { Container } from './assets';
import { HotelDetailsMock } from './assets/HotelDetailsMock';
import { HotelDetailsImages } from './assets/HotelDetailsImages';
import { HotelDetailsComponent } from './assets/HotelDetailsComponent';
import { useGetHotelByIdQuery } from '@/generated';
import { useParams } from 'next/navigation';

export const HotelDetails = () => {
  const { hotel } = useParams();
  const { data } = useGetHotelByIdQuery({ variables: { id: hotel as string } });
  const hotelDetails = data?.getHotelById;
  return (
    <Container backgroundColor="bg-white ">
      <div className="px-[60px] py-8 space-y-8">
        <HotelDetailsImages images={hotelDetails?.images} />
        <div className="space-y-14">
          <div>
            <HotelDetailsComponent
              name={hotelDetails?.name}
              phone={hotelDetails?.phone}
              desc={hotelDetails?.description}
              rating={hotelDetails?.rating}
              stars={hotelDetails?.stars}
              location={hotelDetails?.address}
            />
          </div>
          <div>Choose your room</div>
          <HotelDetailsMock />
        </div>
      </div>
    </Container>
  );
};
