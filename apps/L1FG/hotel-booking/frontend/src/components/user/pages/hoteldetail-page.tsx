import { Search } from '../features/Search';
import { HotelDetailMain } from '../hotel-detail/HotelDetailMain';
import { NavigationBlue } from '../Navigations';
import { Footer } from '../search-result/Footer';
import { BlueDital } from '../ui/microui';

export const HotelDetailPage = () => {
  return (
    <div>
      <NavigationBlue />
      <BlueDital />
      <Search />
      <HotelDetailMain />
      <Footer />
    </div>
  );
};
