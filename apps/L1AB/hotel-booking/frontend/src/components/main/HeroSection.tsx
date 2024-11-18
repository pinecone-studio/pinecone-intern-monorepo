import React from 'react';
import { Container } from './assets';

export const HeroSection = () => {
  return <div className='w-full bg-[#013b94]'>
  <Container backgroundColor="bg-backblue">
    <div className='flex flex-col justify-normal items-center p-10 bg-[#013b94] gap-2'>
      <h1 className='text-4xl font-bold text-white'>Find the Best Hotel for Your Stay</h1>
      <p className='text-base text-white font-normal text-center'>Book from a wide selection of hotels for your next trip.</p>
    </div>
  </Container>;
  </div>
};
