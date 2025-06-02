'use client';
import { useState } from 'react';
import { PasswordStepOne } from './_components/PasswordStepOne';
import { PasswordStepTwo } from './_components/PasswordStepTwo';
import { PasswordStepThree } from './_components/PasswordStepThree';
import Image from 'next/image';

export type PasswordStepOneProps = {
  setStep: (_step: number) => void;
  setEmail: (_email: string) => void;
};

export type PasswordStepTwoProps = {
  setStep: (_step: number) => void;
  email: string;
};

export type PasswordStepThreeProps = {
  email: string;
};

const ForgetPasswordPage = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-2" data-cy="forget-password-page">
      <div className="max-w-md w-full space-y-auto" data-cy="forget-password-container">
        <div className="text-center" data-cy="signup-header" />
        <div className="flex gap-3 items-center justify-center mb-8">
           <Image src="/logo.png" alt="logo" width={34} height={18}/>
           <h2 className="text-2xl font-bold">Home Vault</h2>
            </div>
        {step === 1 && <PasswordStepOne setStep={setStep} setEmail={setEmail} />}
        {step === 2 && <PasswordStepTwo setStep={setStep} email={email} />}
        {step === 3 && <PasswordStepThree email={email} />}
      </div>
      <p className="text-xs text-center text-gray-400 absolute bottom-10 right-0 left-0">©2024 Home Vault</p>
    </div>
  );
};

export default ForgetPasswordPage;
