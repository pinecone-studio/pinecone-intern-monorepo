'use client';

import { MainHeader } from '@/components/main/MainHeader';
import { CarouselUser } from '@/components/match/Carousel';
import { UnMatch } from '@/components/match/UnMatch';
const MatchPage = () => {
  return (
    <>
      <MainHeader />
      <CarouselUser />
      <UnMatch />
    </>
  );
};

export default MatchPage;
