import DarkModeTinderLogo from '@/components/DarkModeTinderLogo';
import TinderLogo from '@/components/TinderLogo';
import { Button } from '@/components/ui/button';
import { CreatePassword } from './(auth)/signup/components/CreatePasswordComponent';

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <CreatePassword />
    </div>
  );
};

export default Home;
