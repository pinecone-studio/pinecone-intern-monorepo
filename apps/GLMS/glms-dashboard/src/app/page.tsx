'use client';

import { Hero } from '@/components/Hero';
import { CourseCardMain } from './_features/CourseCardMain';

const Home = () => {
  return (
    <div data-cy="Home-Page">
      <Hero />
      <div className="my-4">
        <CourseCardMain />
      </div>
    </div>
  );
};
export default Home;
