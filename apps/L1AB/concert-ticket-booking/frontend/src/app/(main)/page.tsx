'use client';

import { Container, Event } from '@/components';
import { MainHeroComponent } from '@/components/maincomponents/MainHero';

const Page = () => {
  return (
    <Container>
      <MainHeroComponent />
      <Event />
    </Container>
  );
};

export default Page;
