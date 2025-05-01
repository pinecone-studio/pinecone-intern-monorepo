'use client';

import HeroSection from './_components/HeroSection';
import CategoryCarousel from './_components/CategoryCarousel';
import ExploreSection from './_components/ExploreSection';
import RecentListingsSection from './_components/RecentListingSection';


const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <CategoryCarousel />
      <ExploreSection />
      <RecentListingsSection />
    
    </div>
  );
};

export default HomePage;
