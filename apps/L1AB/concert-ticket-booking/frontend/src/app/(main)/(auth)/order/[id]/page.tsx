'use client';

import { Container } from '@/components';
import { OrderCheckout } from '@/components/maincomponents/OrderCheckout';
import { useParams } from 'next/navigation';

const Page = () => {
  const { id } = useParams();
  return (
    <Container>
      <OrderCheckout id={id} />
    </Container>
  );
};

export default Page;
