'use client';
import { MainHeader } from '@/components/MainHeader';
import { MultiStepForm1 } from '@/components/MultiStepForm1';
import { MultiStepForm2 } from '@/components/MultiStepForm2';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Signup = () => {
  const router = useRouter();

  const [step, setStep] = useState<'createAccount' | 'confirmEmail' | 'createPass' | 'genderSelect' | 'ageSelect' | 'details' | 'uploadImages' | 'allSet'>('createAccount');

  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <div className="w-[640px] h-fit flex flex-col gap-6 items-center justify-start top-[150px] fixed">
        <MainHeader />

        <div className="w-fit max-w-[640px] h-fit flex flex-col gap-4">
          <MultiStepForm1 step={step} setStep={setStep} />
          <MultiStepForm2 step={step} setStep={setStep} router={router} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
