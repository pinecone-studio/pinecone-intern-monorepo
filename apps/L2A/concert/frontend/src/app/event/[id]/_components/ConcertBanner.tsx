'use client';

import React, { FC } from 'react';
import { Concert } from '@/generated';
import FormatDate from '@/app/_utils/FormatDate';

type ConcertBannerProps = {
  eventData: Concert;
};

export function extractFormattedDates(seatData?: Concert['seatData']): string[] {
  if (!seatData || seatData.length === 0) return [];
  return seatData
    .map((d) => d?.date)
    .filter((d): d is string => Boolean(d))
    .map((date) => {
      const formatted = FormatDate(date);
      if (formatted === 'Тодорхойгүй') return formatted;
      const parts = formatted.split('-');
      return parts.length >= 2 ? `${parts[1]}.${parts[2]}` : 'Invalid Date';
    });
}

const ConcertBanner: FC<ConcertBannerProps> = ({ eventData }) => {
  const dates = extractFormattedDates(eventData.seatData);
  const artistName = eventData.artistName || 'Unknown Artist';
  const eventTitle = eventData.title || 'Untitled Event';

  return (
    <div className="relative w-full h-[400px] bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-85"></div>
      </div>

      <div className="relative z-10 flex flex-col items-start justify-center h-full p-12">
        <button className="px-4 py-2 mb-2 border border-gray-600 rounded-full text-sm font-semibold hover:bg-gray-600 transition-colors">{artistName}</button>
        <h1 className="text-4xl font-bold tracking-wide">{eventTitle.toUpperCase()}</h1>
        {dates.length > 0 ? (
          <div className="flex space-x-2 mt-2">
            {dates.map((date, index) => (
              <span key={index} className="px-2 py-1 bg-gray-800 rounded text-sm">
                {date}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 mt-2 text-sm">No dates available</p>
        )}
      </div>
    </div>
  );
};

export default ConcertBanner;
