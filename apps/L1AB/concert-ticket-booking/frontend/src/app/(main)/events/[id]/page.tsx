import { Container } from '@/components';
import { EventDetails } from '@/components/maincomponents/EventDetails';

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <Container>
      <EventDetails id={id} />
    </Container>
  );
};

export default Page;
