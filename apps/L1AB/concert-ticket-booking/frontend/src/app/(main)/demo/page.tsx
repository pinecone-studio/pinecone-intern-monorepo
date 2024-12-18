'use client';

import { Container } from '@/components';
import { DemoHeroComponent } from '@/components/democomponents/DemoMainHero';
import { Event1 } from '@/components/democomponents/Event1';

const Page = () => {
  return (
    <Container>
      <DemoHeroComponent />
      <Event1 />
    </Container>
  );
};

export default Page;
