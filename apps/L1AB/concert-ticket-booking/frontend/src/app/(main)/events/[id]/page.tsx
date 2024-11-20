'use client';

import { Container } from '@/components';
import { EventDetails } from '@/components/maincomponents/EventDetails';
import { useParams } from 'next/navigation';
import React from 'react';

const Page = () => {
  const { id } = useParams();

  return (
    <Container>
      <div>
        <EventDetails id={id} />
      </div>
    </Container>
  );
};

export default Page;
