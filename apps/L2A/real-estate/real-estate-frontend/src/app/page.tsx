'use client';

import CategoryCarousel from "./_components/CategoryCarousel";
import ExploreSection from "./_components/ExploreSection";
import HeroSection from "./_components/HeroSection";
import RecentListingsSection from "./_components/RecentListingSection";

const Page = () => {
  return (<div>
      <HeroSection />
      <CategoryCarousel />
      <ExploreSection />
      <RecentListingsSection />
  </div>);
};

export default Page;
