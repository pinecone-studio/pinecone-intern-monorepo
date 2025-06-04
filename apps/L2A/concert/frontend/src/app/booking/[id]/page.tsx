'use client';

import { useParams } from 'next/navigation';
import SeatSelection from './_components/SeatSelection';
import { Concert, useConcertQuery } from '@/generated';
import { FC } from 'react';
import StagePlan from '@/app/StagePlan/_feature/Stage';
import LoadingAnimation from '@/app/_components/LoadingAnimation';

const Page: FC = () => {
  const { id }: { id: string } = useParams();

  const { data, loading, error } = useConcertQuery({
    variables: { concertId: id },
    skip: !id,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  if (error) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Error: {error.message}</div>;
  }

  const concert = data?.concert;

  if (!concert) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">No concert found</div>;
  }

  const TypedSeatSelection = SeatSelection as FC<{ event: Concert }>;

  return (
    <div className="mx-auto p-6 rounded-lg shadow-md flex justify-around items-center">
      <div className="w-[40%]">
        <StagePlan />
      </div>
      <div className="w-[30%]">
        <TypedSeatSelection event={concert} />
      </div>
    </div>
  );
};

export default Page;
