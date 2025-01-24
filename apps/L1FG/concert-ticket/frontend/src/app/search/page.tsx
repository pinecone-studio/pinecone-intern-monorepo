'use client';

import { SearchConcert } from '@/components/searchSection/Search';
import { Cards } from '@/components/ticketCard/Cards';
import { useGetConcertsQuery } from '@/generated';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';

const Page = () => {
  const { data, loading } = useGetConcertsQuery();
  const [date, setDate] = useState<Date>();
  const [searchArtist, setSearchArtist] = useState('');
  const handlechange = (value: string) => {
    setSearchArtist(value);
  };
  if (loading)
    return (
      <div data-cy="search-page-get-data-loading" className="text-white">
        loading
      </div>
    );

  const searchConcert = data?.getConcerts.filter((concert) => {
    if (!searchArtist) return true;
    return concert.concertName.toLocaleLowerCase().includes(searchArtist?.toLocaleLowerCase());
  });

  const resultSearch = searchConcert?.filter((concert) => {
    const concertDate = parseISO(concert.concertDay);
    const formatdate = format(concertDate, 'yyyy-MM-dd');
    const formatdate2 = date ? format(date, 'yyyy-MM-dd') : '';
    return formatdate.toLocaleLowerCase().includes(formatdate2?.toLocaleLowerCase());
  });

  return (
    <div
      data-cy="search-page"
      className=""
    >
      <SearchConcert data-cy="search-page-search-section" selected={date} onSelect={setDate} onChange={handlechange} />
      {resultSearch?.length !== 0 ? <Cards cards={resultSearch} data-cy="search-page-cards" /> : <div className="text-white"> Concerts not found</div>}
    </div>
  );
};

export default Page;
