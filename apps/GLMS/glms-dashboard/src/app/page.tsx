'use client';
import { CardWithForm } from './archiv/_components';
import { Hero } from '@/components/Hero';

const Home = () => {
  return (
    <div data-cy="Home-Page">
      <Hero />
      <CardWithForm/>
    </div>
  );
};
export default Home;