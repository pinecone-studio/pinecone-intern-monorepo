'use client';

import { useParams } from 'next/navigation';
import SeatSelection from './_components/SeatSelection';
import { Concert, useConcertQuery } from '@/generated';
import LoadingText from '../../_components/LoadingText';
import { FC } from 'react';

const Page: FC = () => {
  const { id }: { id: string } = useParams();

  const { data, loading, error } = useConcertQuery({
    variables: { concertId: id },
    skip: !id,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <LoadingText />
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
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-md">
      <TypedSeatSelection event={concert} />
    </div>
  );
};

export default Page;
