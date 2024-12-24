'use client';

import { Loading } from '@/components/main/Loading';
import { CarouselUser } from '@/components/match/Carousel';
const MatchPage = () => {
  return (
    <>
      <CarouselUser />
      <Loading />
    </>
  );
};

export default MatchPage;
