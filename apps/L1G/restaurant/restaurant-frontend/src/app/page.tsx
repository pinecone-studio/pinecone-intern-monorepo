'use client';
import HomePageContainer from '@/components/home/HomePageContainer';

import { Logedinnav } from '@/components/sheets/Logedinnav';

const Home = () => {
  return (
    <div>
      <Logedinnav />
      <HomePageContainer />
    </div>
  );
};

export default Home;
