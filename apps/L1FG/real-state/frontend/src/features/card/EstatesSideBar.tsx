import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Categories, Cost, Districts, Provincies, Rooms, ToiletRooms } from '@/constants/constant';
import { Dropdown } from '.';
import { parseAsBoolean, parseAsString, useQueryStates } from 'nuqs';
type Item = {
  value: string;
};

export const EstateSideBar = () => {
  const [queryState, setSelectedQuerys] = useQueryStates({
    searchValue: parseAsString.withDefault(''),
    category: parseAsString.withDefault(''),
    city: parseAsString.withDefault(''),
    districts: parseAsString.withDefault(''),
    maxPrice: parseAsString.withDefault(''),
    minPrice: parseAsString.withDefault(''),
    rooms: parseAsString.withDefault(''),
    toiletRooms: parseAsString.withDefault(''),
    garage: parseAsBoolean.withDefault(false),
    haveTerrace: parseAsBoolean.withDefault(false),
    haveLift: parseAsBoolean.withDefault(false),
  });

  const { searchValue, category, city, districts, maxPrice, minPrice, rooms, toiletRooms, garage, haveTerrace, haveLift } = queryState;

  const handleCityChange = (value: string) => setSelectedQuerys(city === value ? { city: '' } : { city: value });

  const handleDistrictChange = (value: string) => setSelectedQuerys({ districts: value });
  const handleMaxPriceChange = (value: string) => setSelectedQuerys({ maxPrice: value });
  const handleMinPriceChange = (value: string) => setSelectedQuerys({ minPrice: value });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, item: Item) => {
    const { checked } = e.target;
    return checked ? item.value : '';
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="search">Хайлт</Label>
        <Input type="search" id="search" placeholder="Хот, дүүрэг, эсвэл газар хайх" defaultValue={searchValue} onChange={(e) => setSelectedQuerys({ searchValue: e.target.value })} />
      </div>

      {/* Category Selection */}
      <div className="flex flex-col gap-2">
        <p>Төрөл</p>
        {Categories.map((categoryItem) => (
          <div className="flex gap-2" key={categoryItem.id}>
            <input
              type="checkbox"
              data-testid={`side-category-${categoryItem.id}`}
              id={categoryItem.value}
              checked={category === categoryItem.value}
              onChange={() => setSelectedQuerys({ category: category === categoryItem.value ? '' : categoryItem.value })}
            />
            <label htmlFor={categoryItem.value} className="text-sm font-medium">
              {categoryItem.value}
            </label>
          </div>
        ))}
      </div>

      {/* Location Selection */}
      <div className="flex flex-col gap-2">
        <p>Байршил</p>
        <div>
          <Dropdown value={city} placeholder={'Хот'} datas={Provincies} setSelectedValue={handleCityChange} />
        </div>
        <div>
          <Dropdown value={districts} placeholder={'Дүүрэг'} datas={Districts} setSelectedValue={handleDistrictChange} />
        </div>
      </div>

      {/* Price Selection */}
      <div className="flex flex-col gap-2">
        <p>Үнэ</p>
        <div>
          <Dropdown value={maxPrice} placeholder={'Дээд үнэ'} datas={Cost} setSelectedValue={handleMaxPriceChange} />
        </div>
        <div>
          <Dropdown value={minPrice} placeholder={'Доод үнэ'} datas={Cost} setSelectedValue={handleMinPriceChange} />
        </div>
      </div>

      {/* Room Selection */}
      <div className="flex flex-col gap-2">
        <p>Өрөө</p>
        {Rooms.map((room) => (
          <div className="flex gap-2" key={room.id}>
            <input
              type="checkbox"
              data-testid={`side-room-${room.id}`}
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

      {/* Toilet Room Selection */}
      <div className="flex flex-col gap-2">
        <p>Ариун цэвэрийн өрөө</p>
        {ToiletRooms.map((room) => (
          <div className="flex gap-2" key={room.id}>
            <input
              type="checkbox"
              data-testid={`side-toiletroom-${room.id}`}
              id={`toiletroom-${room.id}`}
              checked={toiletRooms === room.value}
              onChange={(event) => setSelectedQuerys({ toiletRooms: handleChange(event, room) })}
            />
            <label htmlFor={`toiletroom-${room.id}`} className="text-sm font-medium">
              {room.value} Ариун цэвэрийн өрөө
            </label>
          </div>
        ))}
      </div>

      {/* Additional Features */}
      <p>Бусад</p>
      <div className="flex gap-2">
        <input type="checkbox" data-testid={`side-garage`} id="garage" checked={garage} onChange={() => setSelectedQuerys({ garage: !garage })} />
        <label htmlFor="garage" className="text-sm font-medium">
          Дулаан зогсоол
        </label>

        <input type="checkbox" data-testid={`side-terrace`} id="terrace" checked={haveTerrace} onChange={() => setSelectedQuerys({ haveTerrace: !haveTerrace })} />
        <label htmlFor="terrace" className="text-sm font-medium">
          Агуулах
        </label>

        <input type="checkbox" data-testid={`side-lift`} id="lift" checked={haveLift} onChange={() => setSelectedQuerys({ haveLift: !haveLift })} />
        <label htmlFor="lift" className="text-sm font-medium">
          Лифт
        </label>
      </div>
    </div>
  );
};
