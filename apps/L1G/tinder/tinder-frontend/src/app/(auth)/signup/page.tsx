import { GenderSelect } from '@/components/GenderSelect';
import { MainHeader } from '@/components/MainHeader';
import YourDetailsPage from '@/components/YourDetailsPage';

const Signup = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <div className="w-[350px] h-fit flex flex-col gap-6 items-center relative top-[100px]">
        Sign up page ju
        <MainHeader />
        <GenderSelect />
      </div>
    </div>
  );
};
export default Signup;
