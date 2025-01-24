'use client';

import { Footerr } from '@/app/footer/Footer';
import Carousel from '@/components/carousel/Carousel';
import { HeaderPart } from '@/components/header/Header';
import { Card } from '@/components/ticketCard/Card';

const slidess = [
  {
    id: 1,
    title: 'MUSIC of the SPHERES',
    subtitle: 'Coldplay',
    dates: '10.31 - 11.01',
    image: 'https://wallpaperaccess.com/full/6133725.jpg',
    _id: '1',
    artistName: ['Coldplay'],
    concertDay: '10.31', // Ensure this is included
    concertName: 'MUSIC of the SPHERES',
    venue: 'Stadium A',
    vipTicket: { price: 34, quantity: 234 },
    regularTicket: { price: 34, quantity: 234 },
    standingAreaTicket: { price: 34, quantity: 234 },
    concertPhoto: 'https://example.com/concertPhoto1.jpg',
    concertPlan: 'Plan A',
    concertTime: '19:00',
  },
  {
    id: 2,
    title: 'HIGHER POWER',
    subtitle: 'World Tour',
    dates: '11.02 - 11.03',
    image: 'https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg',
    _id: '2',
    artistName: ['Various Artists'],
    concertDay: '11.02', // Ensure this is included
    concertName: 'HIGHER POWER',
    venue: 'Stadium B',
    vipTicket: { price: 34, quantity: 234 },
    regularTicket: { price: 34, quantity: 234 },
    standingAreaTicket: { price: 34, quantity: 234 },
    concertPhoto: 'https://example.com/concertPhoto2.jpg',
    concertPlan: 'Plan B',
    concertTime: '20:00',
  },
];

const HomePage = () => {
  return (
    <div>
      <HeaderPart />
      <Carousel slides={slidess} />
      <div className="container mx-auto flex items-center justify-center content-start gap-8 flex-wrap p-[48px]">
        {slidess.map((concert) => (
          <Card key={concert.id} card={concert} />
        ))}
      </div>
      <div className="pt-[48px]">
        <Footerr />
      </div>
    </div>
  );
};

export default HomePage;
