import HomeContainer from '@/components/home/HomeContainer';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div>
      <Button className="bg-red-100">Click</Button>
      <HomeContainer />
    </div>
  );
};

export default Home;
