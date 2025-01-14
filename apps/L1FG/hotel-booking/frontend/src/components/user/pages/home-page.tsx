import { Hero } from '../features/Hero';
import { NavigationBlue } from '../Navigations';
import { HomePageCard } from '../ui/cards';

const HomePage = () => {
  return (
    <main>
      <NavigationBlue />
      <Hero />
      <HomePageCard />
    </main>
  );
};

export default HomePage;
