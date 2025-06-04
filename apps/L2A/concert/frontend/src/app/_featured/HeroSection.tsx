'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import { Concert, useFeaturedEventsQuery } from '@/generated';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import LoadingAnimation from '../_components/LoadingAnimation';

const HeroSection = () => {
  const { data, loading } = useFeaturedEventsQuery();
  const concerts = data?.featuredEvents?.filter((c): c is Concert => c !== null) ?? [];

  if (loading) return <LoadingAnimation />;

  return (
    <Carousel data-testid="hero-section" className="w-full">
      <CarouselContent>
        {concerts.length > 0 &&
          concerts.map((concert) => (
            <CarouselItem key={concert.id} className="relative h-[550px] w-full text-white">
              <div className="absolute inset-0">
                <Image src={concert.thumbnailUrl ?? '/placeholder.webp'} alt="Concert" fill className="object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70" />
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                <div className="bg-white/10 px-4 py-1 rounded-full mb-4 text-sm font-light tracking-wider">{concert.artistName}</div>
                <h1 className="text-4xl md:text-6xl font-bold">{concert.title}</h1>
                <div className="flex items-center gap-2 mt-4 text-lg font-medium">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {concert.seatData[0]?.date} {concert.musicStart}
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-6 top-1/2 -translate-y-1/2 z-20" />
      <CarouselNext className="absolute right-6 top-1/2 -translate-y-1/2 z-20" />
    </Carousel>
  );
};

export default HeroSection;
