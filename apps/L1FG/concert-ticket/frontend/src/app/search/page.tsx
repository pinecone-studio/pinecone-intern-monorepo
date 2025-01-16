'use client';

import { SearchConcert } from '@/components/searchSection/Search';
import { Cards } from '@/components/ticketCard/Cards';
import { useGetConcertsQuery } from '@/generated';
import { useState } from 'react';

const Page = () => {
  const { data, loading, error } = useGetConcertsQuery();
  const [date, setDate] = useState<Date>();
  const [, setSearchArtist] = useState('');
  const handlechange = (value: string) => {
    setSearchArtist(value);
  };
  if (loading) return <div className="text-white">loading</div>;
  if (error) return <div>error({`${error}`})</div>;

  return (
    <div
      data-cy="search-page"
      className="flex flex-col gap-8 w-fit
    m-auto"
    >
      <SearchConcert data-cy="search-page-search-section" selected={date} onSelect={setDate} onChange={handlechange} />
      <Cards cards={data?.getConcerts} data-cy="search-page-search-section" />
    </div>
  );
};

export default Page;
