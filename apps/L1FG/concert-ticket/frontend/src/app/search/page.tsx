'use client';

import { SearchConcert } from '@/components/searchSection/Search';
import { Cards } from '@/components/ticketCard/Cards';
import { useGetConcertsQuery } from '@/generated';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import { useState } from 'react';

const Page = () => {
  const { data } = useGetConcertsQuery();
  const [date, setDate] = useState<Date>();
  const [searchArtist, setSearchArtist] = useState('');

  const handlechange = (value: string) => {
    setSearchArtist(value);
  };

  const searchConcert = data?.getConcerts.filter((concert) => {
    if (!searchArtist) return true;
    return concert.concertName.toLocaleLowerCase().includes(searchArtist?.toLocaleLowerCase());
  });

  const resultSearch = searchConcert?.filter((concert) => {
    const concertDate = parseISO(concert.concertDay);
    const formatdate = format(concertDate, 'yyyy-MM-dd');
    const formatdate2 = date ? format(date, 'yyyy-MM-dd') : '';
    if (!formatdate2) return true;
    return formatdate.toLocaleLowerCase().includes(formatdate2?.toLocaleLowerCase());
  });

  return (
    <div data-cy="search-page" className="flex flex-col w-[1300px]  mx-auto">
      <SearchConcert data-cy="search-page-search-section" selected={date} onSelect={setDate} onChange={handlechange} />
      {resultSearch?.length !== 0 ? (
        <Cards cards={resultSearch} data-cy="search-page-cards" />
      ) : (
        <div className="">
          <div className="flex flex-col justify-center items-center gap-9">
            <Image className="pt-80" width={40} height={36} alt="vector" src="/Vector.svg"></Image>
            <div className="text-neutral-500 font-light text-lg pb-80"> Илэрц олдсонгүй</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
