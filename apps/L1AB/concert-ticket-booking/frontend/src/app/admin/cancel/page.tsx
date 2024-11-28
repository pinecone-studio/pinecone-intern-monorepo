import { AdvertisedEvent, Container } from '@/components';
import { CancelComponent } from '@/components';

const Page = () => {
  return (
    <Container>
      <div className="h-fit w-full text-black text-center ">
        <CancelComponent />
        <AdvertisedEvent />
      </div>
    </Container>
  );
};

export default Page;
