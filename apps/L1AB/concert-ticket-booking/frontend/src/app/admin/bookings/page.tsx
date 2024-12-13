import { Container } from '@/components';
import { BookingComponent } from '@/components/admincomponents/BookingComponent';

const Page = () => {
  return (
    <Container>
      <div className="h-fit w-full text-black text-center ">
        <BookingComponent />
      </div>
    </Container>
  );
};

export default Page;
