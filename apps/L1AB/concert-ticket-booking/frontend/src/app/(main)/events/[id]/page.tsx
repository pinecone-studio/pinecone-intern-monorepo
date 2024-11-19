'use client';

import { Container } from '@/components';
import { useParams } from 'next/navigation';
import React from 'react';

const Page = () => {
  const { id } = useParams();

  return (
    <Container>
      <p className="text-white">Id: {id}</p>
    </Container>
  );
};

export default Page;
