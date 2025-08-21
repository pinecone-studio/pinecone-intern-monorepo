import { ForgetPassword } from '@/components/ForgetPassword';
import { MainHeader } from '@/components/MainHeader';

const ForgotPasswordPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-start relative ">
      <div className="w-[350px] h-fit flex flex-col gap-6 items-center relative top-[200px]">
        <MainHeader />

        <div className="w-[350px]  ">
          <ForgetPassword />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
