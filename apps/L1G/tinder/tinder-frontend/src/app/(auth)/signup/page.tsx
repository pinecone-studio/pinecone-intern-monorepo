'use client';
import { MainHeader } from '@/components/MainHeader';
import { MultiStepForm1 } from '@/components/MultiStepForm1';
import MultiStepForm2 from '@/components/MultiStepForm2';
import { useSignupMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export type UserData = {
  id?: string;
  email?: string;
  otpId?: string;
  password?: string;
  name?: string;
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

  const [step, setStep] = useState<'createAccount' | 'confirmEmail' | 'createPass' | 'genderSelect' | 'ageSelect' | 'details' | 'uploadImages' | 'allSet'>('createAccount');

  const [userData, setUserData] = useState<UserData>({});
  const [signup, { loading: signupLoading, error: signupError }] = useSignupMutation();
  const [message, setMessage] = useState<string | null>(null);

  const updateUserData = (newData: Partial<UserData>) => {
    setUserData((prev) => {
      const updated = { ...prev, ...newData };
      console.log('Updated userData', updated);
      return updated;
    });
  };

  const handleSignup = async () => {
    // if (!userData.email || !userData.otpId || !userData.password) {
    //   setMessage('Email, OTP ID, or password missing.');
    //   return;
    // }
    // try {
    //   const response = await signup({
    //     variables: {
    //       otpId: userData.otpId,
    //       password: userData.password,
    //     },
    //   });

    //   if (response.data?.signup) {
    //     setMessage('Signup successful!');
    //     router.push('/dashboard');
    //   } else {
    //     setMessage('Signup failed.');
    //   }
    // } catch (error: any) {
    //   console.error('Signup failed:', error);
    //   setMessage(`Signup failed: ${error.message}`);
    // }
    console.log('s');
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <div className="w-[640px] h-fit flex flex-col gap-6 items-center justify-start top-[150px] fixed">
        <MainHeader />

        <div className="w-fit max-w-[640px] h-fit flex flex-col gap-4">
          <MultiStepForm1 step={step} setStep={setStep} userData={userData} updateUserData={updateUserData} />
          <MultiStepForm2 step={step} setStep={setStep} router={router} userData={userData} updateUserData={updateUserData} handleSignup={handleSignup} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
