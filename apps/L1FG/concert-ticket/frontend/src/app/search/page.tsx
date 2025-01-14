'use client';

import { SearchConcert } from '@/components/searchSection/Search';
import { Cards } from '@/components/ticketCard/Cards';
import { useState } from 'react';
const cards = [
  { title: 'Music of the Spheres', artist: 'coldplay', price: '200’000$', discount: '160’000', concertDay: '10.31', location: 'UG ARENA', src: '/coldplay.png' },
  { title: 'Music of the Spheres', artist: 'coldplay', price: '200’000$', discount: '160’000', concertDay: '10.31', location: 'UG ARENA', src: '/coldplay.png' },
  { title: 'Music of the Spheres', artist: 'coldplay', price: '200’000$', discount: '160’000', concertDay: '10.31', location: 'UG ARENA', src: '/coldplay.png' },
  { title: 'Music of the Spheres', artist: 'coldplay', price: '200’000$', discount: '160’000', concertDay: '10.31', location: 'UG ARENA', src: '/coldplay.png' },
  { title: 'Music of the Spheres', artist: 'coldplay', price: '200’000$', discount: '160’000', concertDay: '10.31', location: 'UG ARENA', src: '/coldplay.png' },
  { title: 'Music of the Spheres', artist: 'coldplay', price: '200’000$', discount: '160’000', concertDay: '10.31', location: 'UG ARENA', src: '/coldplay.png' },
  { title: 'Music of the Spheres', artist: 'coldplay', price: '200’000$', discount: '160’000', concertDay: '10.31', location: 'UG ARENA', src: '/coldplay.png' },
  { title: 'Music of the Spheres', artist: 'coldplay', price: '200’000$', discount: '160’000', concertDay: '10.31', location: 'UG ARENA', src: '/coldplay.png' },
  { title: 'Music of the Spheres', artist: 'coldplay', price: '200’000$', discount: '160’000', concertDay: '10.31', location: 'UG ARENA', src: '/coldplay.png' },
];
const Page = () => {
  const [date, setDate] = useState<Date>();
  const [, setSearchArtist] = useState('');
  const handlechange = (value: string) => {
    setSearchArtist(value);
  };
  return (
    <div
      data-cy="search-page"
      className="flex flex-col gap-8 w-fit
    m-auto"
    >
      <SearchConcert data-cy="search-page-search-section" selected={date} onSelect={setDate} onChange={handlechange} />
      <Cards cards={cards} data-cy="search-page-search-section" />
    </div>
  );
};

export default Page;
