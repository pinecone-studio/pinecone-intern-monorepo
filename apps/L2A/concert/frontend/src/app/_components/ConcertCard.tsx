import React from 'react';
import Image from 'next/image';
import { Concert } from '@/generated';
import Link from 'next/link';

const ConcertCard = ({ concert }: { concert: Concert }) => {
  const day = new Date(String(concert.seatData[0]?.date));

  return (
    <Link
      data-testid="concert-card"
      href={`/event/${concert.id}`}
      target="_blank"
      className="bg-[#141414] w-[425px] h-[360px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="h-48 bg-gray-700">
        <Image src={concert?.thumbnailUrl ?? '/placeholder.webp'} alt={concert?.title} className="w-full h-full object-cover" width={425} height={192} />
      </div>
      <div className="p-4 flex flex-col justify-between h-[calc(100%-192px)]">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white line-clamp-1">{concert?.title}</h3>
          <p className="text-sm text-gray-400">{concert?.artistName}</p>
          <p className="text-base font-medium text-white">Үнэ: {concert?.seatData[0]?.seats.Standard.price}₮</p>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-3">
          <span>
            📅{' '}
            {day.toLocaleDateString(undefined, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}{' '}
            {concert.musicStart}
          </span>
          <span className="truncate">📍{concert?.venue?.name}</span>
        </div>
      </div>
    </Link>
  );
};

export default ConcertCard;
