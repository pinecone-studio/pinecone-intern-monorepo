'use client';

import HomePageHero from '@/components/HomePage/HomePage';
import { HomePageCategorySection } from '@/components/HomePage/HomePageCategorySection';
import { HomePageLatest } from '@/components/HomePage/HomePageLatest';
import { HomePageSubCategorySection } from '@/components/HomePage/SubCategory';

const Page = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <HomePageHero />
      <HomePageSubCategorySection />
      <HomePageCategorySection />
      <HomePageLatest />
    </div>
  );
};

export default Page;
