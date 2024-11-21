'use client';

import { Container } from '@/components';
import { EventDetails } from '@/components/maincomponents/EventDetails';
import { useParams } from 'next/navigation';
import React from 'react';

const Page = () => {
  const { _id } = useParams();

  return (
    <Container>
      <EventDetails _id={_id} />
    </Container>
  );
};

export default Page;
