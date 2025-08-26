'use client';
import { useState } from 'react';
import { ForgetPassword } from '@/components/ForgetPassword';
import { MainHeader } from '@/components/MainHeader';
import { UserData } from '../signup/page';

const ForgotPasswordPage = () => {
  const [userData, setUserData] = useState<UserData>({});

  const updateUserData = (newData: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...newData }));
    console.log(userData, 'newdata');
  };

  return (
    <div className="w-screen h-screen flex justify-center items-start relative ">
      <div className="w-[350px] h-fit flex flex-col gap-6 items-center relative top-[200px]">
        <MainHeader />
        <div className="w-[350px]">
          <ForgetPassword updateUserData={updateUserData} />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
