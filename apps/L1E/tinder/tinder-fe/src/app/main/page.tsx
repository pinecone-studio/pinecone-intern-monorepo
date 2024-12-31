import { MainHeader } from '@/components/main/MainHeader';
import { CarouselUser } from '@/components/match/Carousel';
import { UnMatch } from '@/components/match/UnMatch';

const page = () => {
  return (
    <div>
      <MainHeader />
      <CarouselUser />
      <UnMatch />
    </div>
  );
};

export default page;
