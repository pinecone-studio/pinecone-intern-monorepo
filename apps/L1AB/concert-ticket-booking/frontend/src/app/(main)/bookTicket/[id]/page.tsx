'use client';
import { BookTicket, Container } from '@/components';
import { useParams } from 'next/navigation';

const Page = () => {
  const { id } = useParams();
  return (
    <Container>
      <BookTicket id={id} />
    </Container>
  );
};

export default Page;
