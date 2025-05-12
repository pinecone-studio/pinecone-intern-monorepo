import React from 'react';
import Image from 'next/image';
import { Concert } from '@/generated';
import Link from 'next/link';
const ConcertCard = ({ concert }: { concert: Concert }) => {
  const start = new Date(Number(concert.musicStart));

  return (
    <Link data-testid={`concert-card`} href={`/event/${concert.id}`} target="_blank" className="bg-[#141414] w-[425px] h-[360px] rounded-lg overflow-hidden">
      <div className="h-48 bg-gray-700">
        <Image src={`${concert?.thumbnailUrl ?? `/placeholder.webp`}`} alt={concert?.title} className="w-full h-full object-cover" width={425} height={370} />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold">{concert?.title}</h3>
        <p className="text-sm text-gray-400 mb-2">{concert?.artistName}</p>
        <p className="font-semibold">Үнэ: {concert?.primaryPrice}₮</p>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>
            <span>
              📅&nbsp;
              {start.toLocaleDateString(undefined, {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}{' '}
              {start.toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </span>
          <span>📍{concert?.venue?.address}</span>
        </div>
      </div>
    </Link>
  );
};
export default ConcertCard;
