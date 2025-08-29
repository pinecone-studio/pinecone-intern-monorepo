import React from 'react';
import { ConcertsHome } from '@/components/ConcertsHome';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

const HomePage = () => {
  return (
    <div className="bg-[#09090B] min-h-screen">
      <Header />

      {/* Home */}

      {/* <CarouselConcert /> */}
      <div className="py-12 px-[117px]">
        <ConcertsHome />
      </div>

      <hr />

      <Footer />
    </div>
  );
};

export default HomePage;
