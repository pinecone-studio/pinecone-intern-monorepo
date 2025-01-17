import { Hero } from '../features/Hero';
import { Search } from '../features/Search';
import { NavigationBlue } from '../Navigations';

const HomePage = () => {
  return (
    <main>
      <NavigationBlue />
      <Hero />
      <Search />
    </main>
  );
};

export default HomePage;
