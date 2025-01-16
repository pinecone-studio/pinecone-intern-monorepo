import React from 'react';
import { Carousel } from '@/components/carousel/Carousel';
import { HeaderPart } from '@/components/header/Header';

const slides = [
  {
    id: 1,
    title: 'MUSIC of the SPHERES',
    subtitle: 'coldplay',
    dates: '10.31 11.01',
    image: 'https://wallpaperaccess.com/full/6133725.jpg',
  },
  {
    id: 2,
    title: 'HIGHER POWER',
    subtitle: 'world tour',
    dates: '11.02 11.03',
    image: 'https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg',
  },
  {
    id: 3,
    title: 'HIGHER POWER',
    subtitle: 'world tour',
    dates: '11.02 11.03',
    image: 'https://images7.alphacoders.com/133/1339451.png',
  },
];

const App = () => {
  return (
    <div>
      <HeaderPart />
      <Carousel slides={slides} />
    </div>
  );
};

export default App;
