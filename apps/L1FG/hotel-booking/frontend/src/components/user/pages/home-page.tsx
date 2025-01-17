import { Hero } from '../features/Hero';
import { NavigationBlue } from '../Navigations';
import { Footer } from '../search-result/Footer';
import { HomePageCard } from '../ui/cards';

const HomePage = () => {
  return (
    <main>
      <NavigationBlue />
      <Hero />
      <HomePageCard/>
      <Footer />
    </main>
  );
};

export default HomePage;
