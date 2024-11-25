'use client';
import { Container } from '@/components';
import { Payment } from '@/components/maincomponents/Payment';
import { useParams } from 'next/navigation';

const Page = () => {
  const { id } = useParams();
  return (
    <Container>
      <Payment id={id} />
    </Container>
  );
};

export default Page;
