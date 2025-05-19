'use client';

import { Concert, useConcertsQuery } from '@/generated';
import HeroSection from './_components/HeroSection';
import ConcertCard from './_components/ConcertCard';
import LoadingText from './_components/LoadingText';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardTrigger } from '@/components/ui/hover-card';

const Page = () => {
  const { data, loading } = useConcertsQuery();
  const concerts = data?.concerts?.filter((c): c is Concert => c !== null) ?? [];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center px-4 py-8" data-testid="dashboard">
      {loading ? (
        <LoadingText />
      ) : data?.concerts ? (
        data.concerts.length > 0 ? (
          <div className="flex flex-col items-center w-full gap-12">
            <HeroSection concert={concerts[0]} />
            <main className="w-full flex flex-col gap-8">
              <div className="flex justify-end pr-4">
                <Link href="/event">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link">Бүгдийг нь харах</Button>
                    </HoverCardTrigger>
                  </HoverCard>
                </Link>
              </div>

              <div className="flex flex-wrap gap-8 justify-center w-11/12 mx-auto">
                {concerts.slice(0, 9).map((concert) => (
                  <ConcertCard key={concert.id} concert={concert} />
                ))}
              </div>
            </main>
          </div>
        ) : (
          <div className="text-lg text-gray-400 mt-10">Концерт алга</div>
        )
      ) : (
        <div className="text-lg text-red-500 mt-10">Алдаа</div>
      )}
    </div>
  );
};

export default Page;
