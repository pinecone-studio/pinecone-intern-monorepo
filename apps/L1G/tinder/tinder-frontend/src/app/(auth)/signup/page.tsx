'use client';
import { MainHeader } from '@/components/MainHeader';
import { MultiStepForm1 } from '@/components/MultiStepForm1';
import MultiStepForm2 from '@/components/MultiStepForm2';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export type UserData = {
  id?: string;
  email?: string;
  otpId?: string;
  password?: string;
  name?: string;
  gender?: string;
  genderPreferences?: string;
  dateOfBirth?: Date | null;
  bio?: string;
  interests?: string[];
  profession?: string;
  schoolWork?: string;
  images?: string[];
};

const Signup = () => {
  const router = useRouter();

  const [step, setStep] = useState<'createAccount' | 'confirmEmail' | 'createPass' | 'genderOfUser' | 'genderSelect' | 'ageSelect' | 'details' | 'uploadImages' | 'allSet'>('createAccount');

  const [userData, setUserData] = useState<UserData>({});

  const updateUserData = (newData: Partial<UserData>) => {
    setUserData((prev) => {
      const updated = { ...prev, ...newData };
      console.log('Updated userData', updated);
      return updated;
    });
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <div className="w-[640px] h-fit flex flex-col gap-6 items-center justify-start top-[150px] fixed">
        <MainHeader />

        <div className="w-fit max-w-[640px] h-fit flex flex-col gap-4">
          <MultiStepForm1 step={step} setStep={setStep} userData={userData} updateUserData={updateUserData} />
          <MultiStepForm2 step={step} setStep={setStep} router={router} userData={userData} updateUserData={updateUserData} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
