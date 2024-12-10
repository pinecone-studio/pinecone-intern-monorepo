import { Container } from '@/components';
import { ArtistComponent } from '@/components/admincomponents/ArtistComponent';

const Page = () => {
  return (
    <Container>
      <div className="h-fit w-full text-black text-center ">
        <ArtistComponent />
      </div>
    </Container>
  );
};

export default Page;
