'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useQueryParamState } from '@/hooks/useQueryState';
import { buildFilters } from '@/lib';
import { useFilterPostQuery } from '@/generated';
import ListingCard from '../_components/ListingCard';
import { useDebounce } from '@/hooks/debounce-hook';
import { useEffect, useState } from 'react';
import TypeComp from './_components/TypeComp';
import LocationComp from './_components/LocationComp';
import PriceComp from './_components/PriceComp';
import RoomsComp from './_components/RoomsComp';
import RestRoomsComp from './_components/RestRoomsComp';
import OthersComp from './_components/OthersComp';
import Link from 'next/link';

const HomeListingPage = () => {
  const [type, setType] = useQueryParamState('type')
  const [city, setCity] = useQueryParamState('city');
  const [district, setDistrict] = useQueryParamState('district');
  const [minPrice] = useQueryParamState('minPrice');
  const [maxPrice] = useQueryParamState('maxPrice');
  const [totalRooms, setTotalRooms] = useQueryParamState('totalRooms');
  const [restrooms, setTotalRestrooms] = useQueryParamState('restrooms');
  const [garage, setGarage] = useQueryParamState('garage');
  const [lift, setLift] = useQueryParamState('lift');
  const [balcony, setBalcony] = useQueryParamState('balcony');
  const [searchFromLanding, setSearchFromLanding] = useQueryParamState('search');
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebounce(searchInput , 500)
  const searchValue = searchFromLanding || debouncedSearch;
  const filters = buildFilters({type,totalRooms,restrooms,city,district,minPrice,maxPrice,garage,lift,balcony, searchValue: searchValue});
  const { data } = useFilterPostQuery({ variables: { filter: filters } });

  useEffect(() => {
    if (searchFromLanding) {
      setSearchInput(searchFromLanding);
      setSearchFromLanding('');
    }
  }
  , [searchFromLanding]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f8f8]" data-cy="listing-page">
      <main className="flex-1 flex flex-col lg:flex-row mx-auto w-full max-w-[1280px]">
        <aside className="w-full lg:w-[300px] border-r px-4 lg:px-6 py-6 bg-white text-sm" data-cy="listing-sidebar">
          <Input   defaultValue={searchFromLanding || ''} onChange={(e)=>setSearchInput(e.target.value)} placeholder="Хот, дүүрэг, эсвэл газар хайх..." className="mb-5" data-cy="listing-search-input" />
          <div className="space-y-6 ">
          <TypeComp type={type} setType={setType}/>
          <LocationComp setCity={setCity}  setDistrict={setDistrict}/>
          <PriceComp/>
          <RoomsComp totalRooms={totalRooms} setTotalRooms={setTotalRooms}/>
          <RestRoomsComp restrooms={restrooms} setTotalRestrooms={setTotalRestrooms}/>
          <OthersComp garage={garage} setGarage={setGarage} lift={lift} setLift={setLift} balcony={balcony} setBalcony={setBalcony}/>
          </div>
        </aside>

        <section className="flex-1 px-4 sm:px-6 py-6" data-cy="listing-section">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 text-sm">
            <p className="text-muted-foreground" data-cy="listing-count">
              Нийт: {data?.filterPosts?.length ?? 0} зарууд
            </p>
            <Button variant="outline" className="flex items-center gap-1 w-fit" data-cy="sort-button">
              Сүүлд нэмэгдсэн <ChevronDown className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-cy="listing-grid">
            {data?.filterPosts?.map((item) => (
              <Link href={`/detailed/${item?._id}`} key={`detailed-${item?._id}`}>
              <ListingCard
                key={item?._id}
                price={item?.price}
                totalRooms={item?.totalRooms}
                restrooms={item?.restrooms}
                size={item?.size}
                city={item?.location?.city}
                district={item?.location?.district}
                image={item?.images?.[0]}
                title={item?.title}
              /></Link>
            ))}
          </div>

        </section>
      </main>
    </div>
  );
};
export default HomeListingPage;
