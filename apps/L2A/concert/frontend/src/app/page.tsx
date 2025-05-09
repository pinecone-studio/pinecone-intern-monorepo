'use client';

import { useConcertsQuery } from '@/generated';
import HeroSection from './_components/HeroSection';
import Image from 'next/image';

const Page = () => {
  const { data, loading } = useConcertsQuery();

  if (loading) {
    return <div className="text-white text-center mt-10">Loading concerts...</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col" data-testid="dashboard">
      <HeroSection />
      <main className="flex flex-wrap gap-[32px] justify-center m-8 ml-[117px] mr-[117px] rounded-lg">
        {data?.concerts?.slice(0, 8).map((concert: any) => (
          <div key={concert.id} className="bg-[#141414] w-[425px] h-[360px] rounded-lg overflow-hidden">
            <div className="h-48 bg-gray-700">
              <Image src={concert.Url || `/placeholder.webp`} alt={concert.title} className="w-full h-full object-cover" width={425} height={370} />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-semibold">{concert.title}</h3>
              <p className="text-sm text-gray-400 mb-2">{concert.artistName}</p>
              <p className="font-semibold">{concert.primaryPrice}</p>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>📅 {concert.musicStart}</span>
                <span>📍 {concert.venue?.name}</span>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Page;
