'use client';
import { Concert, useConcertsQuery } from '@/generated';
import HeroSection from './_components/HeroSection';
import ConcertCard from './_components/ConcertCard';
import LoadingText from './_components/LoadingText';
import Link from 'next/link';

const Page = () => {
  const { data, loading } = useConcertsQuery();
  const concerts = data?.concerts?.filter((c): c is Concert => c !== null) ?? [];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col" data-testid="dashboard">
      {loading ? (
        <LoadingText />
      ) : data?.concerts ? (
        data.concerts.length > 0 ? (
          <div className="flex flex-col items-center justify-center">
            <HeroSection concert={concerts[0]} />
            <main className="flex flex-col gap-[32px] justify-center w-3/4 rounded-lg">
              <Link className="pl-11 pt-11" href={`/event`}>
                Бүгдийг нь харах
              </Link>
              <div className="flex flex-wrap gap-[32px] justify-center items-center rounded-lg">
                {concerts.map((concert) => (
                  <ConcertCard key={concert.id} concert={concert} />
                ))}
              </div>
            </main>
          </div>
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
