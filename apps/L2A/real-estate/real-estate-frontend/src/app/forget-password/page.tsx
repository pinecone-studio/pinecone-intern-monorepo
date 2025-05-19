'use client';
import { useState } from 'react';
import { PasswordStepOne } from './_components/PasswordStepOne';
import { PasswordStepTwo } from './_components/PasswordStepTwo';
import { PasswordStepThree } from './_components/PasswordStepThree';
import SignupHeader from '../signup/_components/SigUpHeader';

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
    <div className="min-h-screen flex items-center justify-center bg-white px-4" data-cy="forget-password-page">
      <div className="max-w-md w-full space-y-6" data-cy="forget-password-container">
        <div className="text-center" data-cy="signup-header" />
        <SignupHeader step={-1} email=" " />

        {step === 1 && <PasswordStepOne setStep={setStep} setEmail={setEmail} />}
        {step === 2 && <PasswordStepTwo setStep={setStep} email={email} />}
        {step === 3 && <PasswordStepThree email={email} />}
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
