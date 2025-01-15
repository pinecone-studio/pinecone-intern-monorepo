import { HotelDetailMain } from '../hotel-detail/HotelDetailMain';
import { Footer } from '../search-result/Footer';
import HomePage from './home-page';

export const HotelDetailPage = () => {
  return (
    <div>
      <HomePage />
      <HotelDetailMain />
      <Footer />
    </div>
  );
};
