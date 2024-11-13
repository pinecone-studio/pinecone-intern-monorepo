import { Container } from '@/components';
import { CancelComponent } from '@/components/providers/CancelComponent';

const Page = () => {
  return (
    <Container>
      <div className="h-fit w-full border text-black text-center ">
        <CancelComponent />
      </div>
    </Container>
  );
};

export default Page;
