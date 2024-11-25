'use client';

import { Container, Event } from '@/components';
import { MainHeroComponent } from '@/components/maincomponents/MainHero';
import { useGetMeQuery } from '@/generated';

const Page = () => {
  const { data } = useGetMeQuery();
  console.log(data);

  return (
    <Container>
      <MainHeroComponent />
      <Event />
    </Container>
  );
};

export default Page;
