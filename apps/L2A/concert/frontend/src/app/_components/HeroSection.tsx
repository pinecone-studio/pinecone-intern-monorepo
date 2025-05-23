import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import Image from 'next/image';
import { Concert } from '@/generated';

const HeroSection = ({ concert }: { concert: Concert }) => {
  return (
    <div className="relative h-[550px] w-full bg-black text-white" data-testid="hero-section">
      <div className="absolute inset-0">
        <Image src={concert.thumbnailUrl ?? `/placeholder.webp`} alt="Concert" fill className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
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
      <button className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full">
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full">
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};
export default HeroSection;
