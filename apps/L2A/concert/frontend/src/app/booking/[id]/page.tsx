'use client';

import { useParams } from 'next/navigation';
import SeatSelection from './_components/SeatSelection';
import { Concert, useConcertQuery } from '@/generated';
import { FC } from 'react';
import StagePlan from '@/app/StagePlan/_feature/Stage';
import LoadingAnimation from '@/app/_components/LoadingAnimation';

const Page: FC = () => {
  const { id } = useParams() as { id: string };

  const { data, loading, error } = useConcertQuery({
    variables: { concertId: id },
    skip: !id,
  });

  const concert = data?.concert;

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (!concert) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Concert not found.</p>
      </div>
    );
  }

  const TypedSeatSelection = SeatSelection as FC<{ event: Concert }>;

  return (
    <div className="min-h-screen p-6 bg-background text-black flex flex-col lg:flex-row justify-center items-center gap-20">
      <div className="w-full lg:w-[40%] max-w-md">
        <StagePlan />
      </div>
      <div className="w-full lg:w-[30%] max-w-md">
        <TypedSeatSelection event={concert} />
      </div>
    </div>
  );
};

export default Page;
