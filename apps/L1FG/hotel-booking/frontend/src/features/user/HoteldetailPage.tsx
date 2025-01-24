import { NavigationBlue } from '@/components/user/main/NavigationBlue';
import { BlueDital } from '@/components/user/ui/dital';
import { HotelDetailMain } from '@/components/user/hotel-detail/HotelDetailMain';
import { SearchBar } from '@/components/user/main/SearchBar';
import { Footer } from '@/components/user/search-result/Footer';

export const HotelDetailPage = () => {
  return (
    <>
      <NavigationBlue />
      <BlueDital />
      <SearchBar />
      <HotelDetailMain />
      <Footer />
    </>
  );
};
