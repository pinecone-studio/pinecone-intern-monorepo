import { BookTicket, Container } from '@/components';

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <Container>
      <BookTicket id={id} />
    </Container>
  );
};

export default Page;
