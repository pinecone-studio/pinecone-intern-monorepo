import { Container } from '@/components';
import { OrderCheckout } from '@/components/maincomponents/OrderCheckout';

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <Container>
      <OrderCheckout id={id} />
    </Container>
  );
};

export default Page;
