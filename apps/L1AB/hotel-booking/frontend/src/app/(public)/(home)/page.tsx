'use client';

import { HotelsGrid, PriceDetailDialog } from '@/components/main';
import { ImageDialog } from '@/components/main/assets';

const Page = () => {
  return (
    <>
      <HotelsGrid />
      <PriceDetailDialog/>
      <ImageDialog/>
    </>
  );
};

export default Page;
