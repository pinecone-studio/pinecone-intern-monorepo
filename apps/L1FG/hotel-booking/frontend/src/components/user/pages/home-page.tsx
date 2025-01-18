import { Hero } from '../features/Hero';
import { SearchBar } from '../features/SearchBar';

import { HomeHotelList } from '../home-page';
import { NavigationBlue } from '../Navigations';

const HomePage = () => {
  return (
    <main>
      <NavigationBlue />
      <Hero />
      <SearchBar />
      <HomeHotelList />
    </main>
  );
};

export default HomePage;
