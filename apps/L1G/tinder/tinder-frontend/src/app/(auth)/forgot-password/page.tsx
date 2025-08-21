'use client';
import { ForgetPassword } from '@/components/ForgetPassword';
import { MainHeader } from '@/components/MainHeader';
import { UserData } from '../../signup/page';

const ForgotPasswordPage = () => {
  const updateUserData: (_: Partial<UserData>) => void = () => {
    //intenionally empty
  };
  return (
    <div className="w-screen h-screen flex justify-center items-start relative ">
      <div className="w-[350px] h-fit flex flex-col gap-6 items-center relative top-[200px]">
        <MainHeader />

        <div className="w-[350px]  ">
          <ForgetPassword updateUserData={updateUserData} />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
