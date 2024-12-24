import { Container } from '@/components';

import { Demo } from '@/components/admincomponents/DemoComponent';

const Page = () => {
  return (
    <Container>
      <div className="h-fit w-full text-black text-center ">
        <Demo></Demo>
      </div>
    </Container>
  );
};

export default Page;
