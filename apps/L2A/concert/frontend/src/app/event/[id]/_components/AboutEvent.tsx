'use client';

import React, { FC } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import StadiumMap from './StadiumMap';
import { Concert } from '@/generated';
import FormatDate from '@/app/_utils/format-date';

type AboutEventProps = {
  eventData: Concert;
};

export const formatTime = (timestamp?: string | number): string => {
  if (!timestamp) return 'Тодорхойгүй';
  const parsed = Number(timestamp);
  if (isNaN(parsed)) return 'Тодорхойгүй';

  const date = new Date(parsed);
  if (isNaN(date.getTime())) return 'Тодорхойгүй';

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const renderDateTime = (endDate: string, musicStart?: string | number) => (
  <div className="flex items-center gap-4">
    <div className="flex items-center gap-1">
      <Calendar size={18} className="text-gray-500" />
      <span>{FormatDate(endDate)}</span>
    </div>
    <div className="flex items-center gap-1">
      <Clock size={18} className="text-gray-500" />
      <span>{formatTime(musicStart)}</span>
    </div>
  </div>
);

export const renderVenue = (venueName?: string) => (
  <div className="flex items-center gap-1 underline cursor-pointer">
    <MapPin size={18} className="text-gray-500" />
    <span>{venueName || 'Venue not available'}</span>
  </div>
);

export const renderArtists = (artistName?: string, specialGuestName?: string) => {
  const artists = [artistName, specialGuestName].filter(Boolean) as string[];
  return (
    <div>
      <h2 className="font-semibold mb-1">Special Artist</h2>
      <ul className="list-disc list-inside text-gray-200">{artists.length > 0 ? artists.map((artist, index) => <li key={index}>{artist}</li>) : <li>No artists listed</li>}</ul>
    </div>
  );
};

export const renderSchedule = (doorOpen?: string, musicStart?: string | number) => (
  <div>
    <h2 className="font-semibold mb-1">Тоглолтын цагийн хуваарь:</h2>
    <ul className="list-disc list-inside text-gray-200">
      <li>
        <strong>Door open:</strong> {doorOpen && !isNaN(Number(doorOpen)) && Number(doorOpen) < 1000 ? `${doorOpen} цагийн өмнө` : doorOpen}
      </li>
      <li>
        <strong>Music start:</strong> {musicStart}
      </li>
    </ul>
  </div>
);

export const AboutEvent: FC<AboutEventProps> = ({ eventData }) => {
  console.log('eventData in AboutEvent:', eventData);
  if (!eventData.endDate) {
    return <div>Error: Missing required event date</div>;
  }

  return (
    <div data-testid="about-event" className="text-white min-h-screen mx-auto space-y-8">
      <div className="flex justify-between items-center text-gray-300">
        {renderDateTime(eventData.endDate, eventData.musicStart)}
        {renderVenue(eventData.venue?.name)}
      </div>
      {renderArtists(eventData.artistName ?? undefined, eventData.specialGuestName ?? undefined)}
      {renderSchedule(eventData.doorOpen, eventData.musicStart)}
      <div>
        <h2 className="font-semibold mb-2 text-gray-200">Stage plan:</h2>
        <StadiumMap eventData={eventData} />
      </div>
    </div>
  );
};

export default AboutEvent;
