'use client';
import { BookTicket, Container } from '@/components';
import { useParams } from 'next/navigation';

const page = () => {
  const { _id } = useParams();
  return (
    <Container>
      <BookTicket _id={_id} />
    </Container>
  );
};

export default page;
