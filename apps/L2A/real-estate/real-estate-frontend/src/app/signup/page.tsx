'use client';
import { useState } from 'react';
import { StepOne } from './_components/StepOne';
import { StepThree } from './_components/StepThree';
import { StepTwo } from './_components/StepTwo';
import SignupHeader from './_components/SigUpHeader';
import SignupFooter from './_components/SignUpFooter';

export type StepOneProps = {
  setStep: (_step: number) => void;
  setEmail: (_email: string) => void;
};

export type StepTwoProps = {
  setStep: (_step: number) => void;
};

const SignUpPage = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4" data-cy="signup-page">
      <div className="max-w-md w-full space-y-6" data-cy="signup-container">
        <SignupHeader step={step} email={email} />
        {step === 1 && <StepOne setStep={setStep} setEmail={setEmail} />}
        {step === 2 && <StepTwo setStep={setStep} />}
        {step === 3 && <StepThree />}
        <SignupFooter step={step} />
      </div>
    </div>
  );
};

export default SignUpPage;
