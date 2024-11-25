import React from 'react';
import { Container } from './assets';

export const HeroSection = () => {
  return (
    <Container backgroundColor="bg-backBlue">
      <div className="flex flex-col justify-normal items-center pt-10 pb-2 gap-2">
        <h1 className="text-4xl font-bold text-white">Find the Best Hotel for Your Stay</h1>
        <p className="text-base text-white font-normal text-center">Book from a wide selection of hotels for your next trip.</p>
      </div>
    </Container>
  );
};
