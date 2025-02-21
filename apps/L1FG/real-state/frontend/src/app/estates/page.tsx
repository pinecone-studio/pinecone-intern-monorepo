/* eslint-disable max-lines */
/* eslint-disable complexity */
'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Categories, Cost, Districts, Provincies, Rooms, ToiletRooms } from '@/constants/constant';
import { Estates } from '@/components/estatesPage/EstatePage';
import { parseAsBoolean, parseAsString, useQueryStates } from 'nuqs';
import { Dropdown } from '@/features/card';
import { useGetPostsQuery } from '@/generated';
import { Loading } from '@/components/layout/Loading';

type Item = {
  value: string;
};

const Page = () => {
  const [queryState, setSelectedQuerys] = useQueryStates({
    searchValue: parseAsString.withDefault(''),
    houseType: parseAsString.withDefault(''),
    city: parseAsString.withDefault(''),
    district: parseAsString.withDefault(''),
    maxPrice: parseAsString.withDefault(''),
    minPrice: parseAsString.withDefault(''),
    rooms: parseAsString.withDefault(''),
    restroom: parseAsString.withDefault(''),
    garage: parseAsBoolean.withDefault(false),
    balcony: parseAsBoolean.withDefault(false),
    lift: parseAsBoolean.withDefault(false),
  });

  const { searchValue, houseType, city, district, maxPrice, minPrice, rooms, restroom, garage, balcony, lift } = queryState;

  const handleCityChange = (value: string) => {
    setSelectedQuerys({ city: value });
  };
  const handleDistrictChange = (value: string) => setSelectedQuerys({ district: value });
  const handleMaxPriceChange = (title: string) => setSelectedQuerys({ maxPrice: title });
  const handleMinPriceChange = (title: string) => setSelectedQuerys({ minPrice: title });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, item: Item) => {
    const { checked } = e.target;
    return checked ? item.value : '';
  };

  const { data, loading } = useGetPostsQuery({
    variables: {
      input: {
        status: 'APPROVED',
      },
    },
  });
  const clear = () => {
    setSelectedQuerys({ searchValue: '', houseType: '', city: '', district: '', maxPrice: '', minPrice: '', rooms: '', restroom: '', garage: false, balcony: false, lift: false });
  };

  const filteredPosts = data?.getPosts.filter((post) => {
    if (searchValue && !post.title.toLowerCase().includes(searchValue.toLowerCase())) return false;
    if (houseType && post.propertyDetail.houseType !== houseType) return false;
    if (city && post.propertyDetail.location.city !== city) return false;
    if (district && post.propertyDetail.location.district !== district) return false;
    const price = Number(post.price);
    if (minPrice && price < Number(minPrice)) return false;
    if (maxPrice && price > Number(maxPrice)) return false;
    if (rooms && post.propertyDetail.totalRooms !== parseFloat(rooms)) return false;
    if (restroom && post.propertyDetail.restrooms !== parseFloat(restroom)) return false;
    if (garage && !post.propertyDetail.garage) return false;
    if (balcony && !post.propertyDetail.details?.balcony === balcony) return false;
    if (lift && !post.propertyDetail.details?.lift) return false;

    return true;
  });

  if (loading) return <Loading />;

  return (
    <div data-cy="estates-page" className="flex p-4 gap-4 max-w-screen-xl lg:min-w-full">
      <div className="flex flex-col gap-4">
        <div className="grid w-full max-w-2xl items-center gap-1.5">
          <button className="border  p-2 bg-white rounded-md" data-cy="estates-page-clear-search-value" onClick={clear}>
            Хайлтыг арилгах
          </button>
          <Label htmlFor="search">Хайлт</Label>
          <Input
            type="search"
            id="search"
            data-cy="estates-page-search-input"
            placeholder="Хот, дүүрэг, эсвэл газар хайх"
            defaultValue={searchValue}
            onChange={(e) => setSelectedQuerys({ searchValue: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p>Төрөл</p>
          {Categories.map((categoryItem) => (
            <div className="flex gap-2" key={categoryItem.id}>
              <input
                type="checkbox"
                data-testid={`side-category-${categoryItem.id}`}
                data-cy={`estates-page-category-checkbox-${categoryItem.id}`}
                id={categoryItem.value}
                checked={houseType === categoryItem.title}
                onChange={() => setSelectedQuerys({ houseType: houseType === categoryItem.title ? '' : categoryItem.title })}
              />
              <label htmlFor={categoryItem.value} className="text-sm font-medium">
                {categoryItem.value}
              </label>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <p>Байршил</p>
          <div data-cy="estates-page-city-dropdown">
            <Dropdown value={city} placeholder={'Хот'} datas={Provincies} setSelectedValue={handleCityChange} />
          </div>
          <div data-cy="estates-page-district-dropdown">
            <Dropdown value={district} placeholder={'Дүүрэг'} datas={Districts} setSelectedValue={handleDistrictChange} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p>Үнэ</p>
          <div data-cy="estates-page-max-price-dropdown">
            <Dropdown value={maxPrice} placeholder={'Дээд үнэ'} datas={Cost} setSelectedValue={handleMaxPriceChange} />
          </div>
          <div data-cy="estates-page-min-price-dropdown">
            <Dropdown value={minPrice} placeholder={'Доод үнэ'} datas={Cost} setSelectedValue={handleMinPriceChange} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p>Өрөө</p>
          {Rooms.map((room) => (
            <div className="flex gap-2" key={room.id}>
              <input
                type="checkbox"
                data-testid={`side-room-${room.id}`}
                data-cy={`estates-page-room-checkbox-${room.id}`}
                id={`room-${room.id}`}
                checked={rooms === room.value}
                onChange={(event) => setSelectedQuerys({ rooms: handleChange(event, room) })}
              />
              <label htmlFor={`room-${room.id}`} className="text-sm font-medium">
                {room.value} өрөө
              </label>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <p>Ариун цэвэрийн өрөө</p>
          {ToiletRooms.map((room) => (
            <div className="flex gap-2" key={room.id}>
              <input
                type="checkbox"
                data-testid={`side-toiletroom-${room.id}`}
                data-cy={`estates-page-toilet-room-checkbox-${room.id}`}
                id={`toiletroom-${room.id}`}
                checked={restroom === room.value}
                onChange={(event) => setSelectedQuerys({ restroom: handleChange(event, room) })}
              />
              <label htmlFor={`toiletroom-${room.id}`} className="text-sm font-medium">
                {room.value} Ариун цэвэрийн өрөө
              </label>
            </div>
          ))}
        </div>

        <p>Бусад</p>
        <div className="flex gap-2">
          <input type="checkbox" data-testid={`side-garage`} data-cy="estates-page-garage-checkbox" id="garage" checked={garage} onChange={() => setSelectedQuerys({ garage: !garage })} />
          <label htmlFor="garage" className="text-sm font-medium">
            Дулаан зогсоол
          </label>

          <input type="checkbox" data-testid={`side-terrace`} data-cy="estates-page-terrace-checkbox" id="terrace" checked={balcony} onChange={() => setSelectedQuerys({ balcony: !balcony })} />
          <label htmlFor="terrace" className="text-sm font-medium">
            Агуулах
          </label>

          <input type="checkbox" data-testid={`side-lift`} data-cy="estates-page-lift-checkbox" id="lift" checked={lift} onChange={() => setSelectedQuerys({ lift: !lift })} />
          <label htmlFor="lift" className="text-sm font-medium">
            Лифт
          </label>
        </div>
      </div>
      <Estates data={filteredPosts} />
    </div>
  );
};

export default Page;
