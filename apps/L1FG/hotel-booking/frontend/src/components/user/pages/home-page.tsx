import { Hero } from '../features/Hero';
import { NavigationBlue, SinglePageCard } from '../Navigations';

const HomePage = () => {
  return (
    <main>
      <NavigationBlue />
      <Hero />
      <SinglePageCard />
    </main>
  );
};

export default HomePage;
