'use client';

import Carousel from '@/components/carousel/Carousel';
import { HeaderPart } from '@/components/header/Header';
import { Footerr } from './footer/Footer';

const slides = [
  {
    id: 1,
    title: 'MUSIC of the SPHERES',
    subtitle: 'Coldplay',
    dates: '10.31 - 11.01',
    image: 'https://wallpaperaccess.com/full/6133725.jpg',
  },
  {
    id: 2,
    title: 'HIGHER POWER',
    subtitle: 'World Tour',
    dates: '11.02 - 11.03',
    image: 'https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg',
  },
];

const Page = () => {
  return (
    <div>
      <HeaderPart />
      <Carousel slides={slides} />
      <Footerr />
    </div>
  );
};

export default Page;
