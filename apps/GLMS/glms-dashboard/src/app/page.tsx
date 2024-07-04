'use client';

import { Hero } from '@/components/Hero';
import { CourseCardMain } from './_features/CourseCardMain';

const Home = () => {
  return (
    <div data-cy="Home-Page">
      <Hero />
      <CourseCardMain />
    </div>
  );
};
export default Home;
