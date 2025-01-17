import { Search } from '../features/Search';
import { HotelDetailMain } from '../hotel-detail/HotelDetailMain';
import { NavigationBlue } from '../Navigations';
import { BlueDital } from '../ui/microui';

export const HotelDetailPage = () => {
  return (
    <div>
      <NavigationBlue />
      <BlueDital />
      <Search />
      <HotelDetailMain />
    </div>
  );
};
