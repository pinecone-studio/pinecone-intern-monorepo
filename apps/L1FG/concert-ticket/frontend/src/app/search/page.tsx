'use client';

import { SearchConcert } from '@/components/searchSection/Search';
import { Cards } from '@/components/ticketCard/Cards';
import { useGetConcertsQuery } from '@/generated';
import { format, parseISO } from 'date-fns';
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
    <div
      data-cy="search-page"
      className="flex flex-col gap-8 w-fit
    m-auto"
    >
      <SearchConcert data-cy="search-page-search-section" selected={date} onSelect={setDate} onChange={handlechange} />
      {resultSearch?.length !== 0 ? <Cards cards={resultSearch} data-cy="search-page-cards" /> : <div className="text-white"> Concerts not found</div>}
    </div>
  );
};

export default Page;
