import { Hero } from '../features/Hero';
import { Search } from '../features/Search';
import { HomeHotelList } from '../home-page';
import { NavigationBlue } from '../Navigations';

const HomePage = () => {
  return (
    <main>
      <NavigationBlue />
      <Hero />
      <Search />
      <HomeHotelList />
    </main>
  );
};

export default HomePage;
