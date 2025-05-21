import { Input } from '@/components/ui/input';
import { SelectFilter } from '../../_components/SelectFilter';

const FilterHotelsAdmin = () => {
  const locationOptions = [
    { item: 'All', value: 'all' },
    { item: 'Ulaanbaatar', value: 'ub' },
    { item: 'Erdenet', value: 'erdenet' },
    { item: 'Darkhan', value: 'darkhan' },
    { item: 'Khovd', value: 'khovd' },
  ];
  const roomOptions = [
    { item: 'All room', value: 'all' },
    { item: 'Single', value: 'single' },
    { item: 'Double', value: 'double' },
    { item: 'Deluxe', value: 'deluxe' },
  ];
  const starRating = [
    { item: 'All', value: 'all' },
    { item: '1 star', value: 'one' },
    { item: '2 star', value: 'two' },
    { item: '3 star', value: 'three' },
    { item: '4 star', value: 'four' },
    { item: '5 star', value: 'five' },
  ];
  const userRating = [
    { item: 'All', value: 'all' },
    { item: '+9 Excellent', value: 'excellent' },
    { item: '+8 Very good', value: 'very good' },
    { item: '+7 Good', value: 'good' },
  ];

  return (
    <div className="w-[95%] h-10 flex gap-2   ">
      <Input className="py-2 px-3 flex items-center focus-visible:ring-0 m-auto  " placeholder="Search" />
      <SelectFilter placeholder="Location" items={locationOptions} />
      <SelectFilter placeholder="Rooms" items={roomOptions} />
      <SelectFilter placeholder="Star Rating" items={starRating} />
      <SelectFilter placeholder="User Rating" items={userRating} />
    </div>
  );
};

export default FilterHotelsAdmin;
