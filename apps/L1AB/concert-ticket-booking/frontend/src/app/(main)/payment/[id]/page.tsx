import { Container } from '@/components';
import { Payment } from '@/components/maincomponents/Payment';

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <Container>
      <Payment id={id} />
    </Container>
  );
};

export default Page;
