'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ChevronDown } from 'lucide-react';
import { useQueryParamState } from '@/hooks/useQueryState';
import { buildFilters } from '@/lib';
import { useFilterPostQuery } from '@/generated';
import ListingCard from '../home/_components/ListingCard';
import { useDebounce } from '@/hooks/debounce-hook';
import { useState } from 'react';

const HomeListingPage = () => {
  const [type, setType] = useQueryParamState('type')
  const [city] = useQueryParamState('city');
  const [district] = useQueryParamState('district');
  const [minPrice] = useQueryParamState('minPrice');
  const [maxPrice] = useQueryParamState('maxPrice');
  const [totalRooms, setTotalRooms] = useQueryParamState('totalRooms');
  const [restrooms, setTotalRestrooms] = useQueryParamState('restrooms');
  const [garage, setGarage] = useQueryParamState('garage');
  const [lift, setLift] = useQueryParamState('lift');
  const [balcony, setBalcony] = useQueryParamState('balcony');
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebounce(searchInput , 500)
  

  const filters = buildFilters({type,totalRooms,restrooms,city,district,minPrice,maxPrice,garage,lift,balcony, searchValue:debouncedSearch});
  const { data } = useFilterPostQuery({ variables: { filter: filters } });
  const toggleType = (value: string) => {
    const current = type?.split(',') ?? [];
    const updated = current.includes(value)
      ? current.filter((t) => t !== value)
      : [...current, value];
    setType(updated.join(','));
  };

  const selectedRooms = totalRooms?.split(',').map(Number) ?? [];
  const selectedRestrooms = restrooms?.split(',').map(Number) ?? [];
  const selectedTypes = type?.split(',') ?? [];

  const toggleRoom = (value: number) => {
    const updated = selectedRooms.includes(value) ? selectedRooms.filter((v) => v !== value): [...selectedRooms, value];
    setTotalRooms(updated.join(','));
  };

  const toggleRestroom = (value: number) => {
    const updated = selectedRestrooms.includes(value)? selectedRestrooms.filter((v) => v !== value): [...selectedRestrooms, value];
    setTotalRestrooms(updated.join(','));
  };
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f8f8]" data-cy="listing-page">
      <main className="flex-1 flex flex-col lg:flex-row mx-auto w-full max-w-[1280px]">
        <aside className="w-full lg:w-[300px] border-r px-4 lg:px-6 py-6 bg-white text-sm" data-cy="listing-sidebar">
          <Input onChange={(e)=>setSearchInput(e.target.value)} placeholder="Хот, дүүрэг, эсвэл газар хайх..." className="mb-5" data-cy="listing-search-input" />
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2" data-cy="type-apartment">
                <Checkbox id="apartment" checked={selectedTypes.includes("APARTMENT")} onCheckedChange={() => toggleType("APARTMENT")}/>
                <Label htmlFor="apartment">Байр</Label>
              </div>
              <div className="flex items-center gap-2" data-cy="type-house">
                <Checkbox id="house" checked={selectedTypes.includes("HOUSE")} onCheckedChange={() => toggleType("HOUSE")}/>
                <Label htmlFor="house">Хаус</Label>
              </div>
              <div className="flex items-center gap-2" data-cy="type-office">
                <Checkbox id="office" checked={selectedTypes.includes("OFFICE")} onCheckedChange={() => toggleType("OFFICE")}/>
                <Label htmlFor="office">Оффис</Label>
              </div>
            </div>
            <div>
              <Label className="block mb-2">Байршил</Label>
              <select className="w-full mb-2 border rounded px-2 py-1 text-sm" data-cy="select-city">
                <option>Хот</option>
              </select>
              <select className="w-full border rounded px-2 py-1 text-sm" data-cy="select-district">
                <option>Дүүрэг</option>
              </select>
            </div>
            <div>
              <Label className="block mb-2">Үнэ</Label>
              <select className="w-full border rounded px-2 py-1 text-sm" data-cy="price-min">
                <option>Доод</option>
              </select>
              <select className="w-full mt-2 border rounded px-2 py-1 text-sm" data-cy="price-max">
                <option>Дээд</option>
              </select>
            </div>
            <div>
              <Label className="block mb-2">Өрөө</Label>
              {[1, 2, 3, 4, 5].map((room) => (
                <div key={room} className="flex items-center gap-2" data-cy={`room-${room}`}>
                  <Checkbox id={`room-${room}`} checked={selectedRooms.includes(room)} onCheckedChange={() => toggleRoom(room)} />
                  <Label htmlFor={`room-${room}`}>{room} өрөө</Label>
                </div>
              ))}
            </div>
            <div>
              <Label className="block mb-2">Ариун цэврийн өрөө</Label>
              {[1, 2, 3].map((bath) => (
                <div key={bath} className="flex items-center gap-2" data-cy={`bath-${bath}`}>
                  <Checkbox id={`bath-${bath}`} checked={selectedRestrooms.includes(bath)} onCheckedChange={() => toggleRestroom(bath)} />
                  <Label htmlFor={`bath-${bath}`}>{bath} өрөө</Label>
                </div>
              ))}
            </div>
            <div>
              <Label className="block mb-2">Бусад</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2" data-cy="option-garage">
                  <Checkbox id="garage" checked={garage === 'true'} onCheckedChange={(checked) => setGarage(checked ? 'true' : '')} />
                  <Label htmlFor="garage">Дулаан зогсоол</Label>
                </div>
                <div className="flex items-center gap-2" data-cy="option-lift">
                  <Checkbox id="lift" checked={lift === 'true'} onCheckedChange={(checked) => setLift(checked ? 'true' : '')} />
                  <Label htmlFor="lift">Лифт</Label>
                </div>
                <div className="flex items-center gap-2" data-cy="option-balcony">
                  <Checkbox id="balcony" checked={balcony === 'true'} onCheckedChange={(checked) => setBalcony(checked ? 'true' : '')} />
                  <Label htmlFor="balcony">Агуулах</Label>
                </div>
              </div>
            </div>
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
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
export default HomeListingPage;
