'use client';

import React, { FC } from 'react';
import { Concert, useConcertQuery } from '@/generated';
import AboutEvent from './_components/AboutEvent';
import SeatInfo from './_components/SeatInfo';
import { useParams } from 'next/navigation';
import ConcertBanner from './_components/ConcertBanner';
import RecommendConcert from './_components/RecommendConcert';

const Page: FC = () => {
  const { id }: { id: string } = useParams();

  const { data, loading, error } = useConcertQuery({
    variables: { concertId: id },
    skip: !id,
  });

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Error: {error.message}</div>;
  }

  const concert = data?.concert;

  if (!concert) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">No concert found</div>;
  }

  console.log('Concert data:', concert);
  console.log('Seat data:', concert.seatData);

  const TypedAboutEvent = AboutEvent as FC<{ eventData: Concert }>;
  const TypedSeatInfo = SeatInfo as FC<{ eventData: Concert }>;
  const TypedHeroSection = ConcertBanner as FC<{ eventData: Concert }>;

  return (
    <div className="min-h-screen bg-black text-white">
      <div>
        <TypedHeroSection eventData={concert} />
      </div>
      <div className="flex flex-col md:flex-row w-full md:w-[70%] mx-auto gap-10 py-6 px-4">
        <div className="w-full md:w-[70%]">
          <TypedAboutEvent eventData={concert} />
        </div>
        <div className="w-full md:w-[30%]">
          <TypedSeatInfo eventData={concert} />
        </div>
      </div>
      <RecommendConcert />
    </div>
  );
};

export default Page;
