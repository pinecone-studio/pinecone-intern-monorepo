'use client';
import { Concert, useConcertsQuery } from '@/generated';
import LoadingText from '../_components/LoadingText';
import ConcertCard from '../_components/ConcertCard';

const Page = () => {
  const { data, loading } = useConcertsQuery();
  const concerts = data?.concerts?.filter((c): c is Concert => c !== null) ?? [];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col" data-testid="dashboard">
      {loading ? (
        <LoadingText />
      ) : data?.concerts ? (
        data.concerts.length > 0 ? (
          <>
            <main className="flex flex-wrap gap-[32px] justify-center m-8 ml-[117px] mr-[117px] rounded-lg">
              {concerts.map((concert) => (
                <ConcertCard key={concert.id} concert={concert} />
              ))}
            </main>
          </>
        ) : (
          <div>Концерт алга</div>
        )
      ) : (
        <div>Алдаа</div>
      )}
    </div>
  );
};

export default Page;
