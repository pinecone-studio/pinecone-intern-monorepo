import HomePageContainer from '@/components/home/HomePageContainer';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div>
      <Button className="bg-red-100">Click</Button>
      <HomePageContainer />
    </div>
  );
};

export default Home;
