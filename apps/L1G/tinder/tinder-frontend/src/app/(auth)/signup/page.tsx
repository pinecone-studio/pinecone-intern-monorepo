import { TinderLogo } from '@/components/TinderLogo';
import { YouAreAllSet } from '@/components/YouAreAllSet';

const Signup = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[350px] h-fit flex flex-col gap-6 items-center">
        <TinderLogo />
        <YouAreAllSet />
      </div>
    </div>
  );
};

export default Signup;
