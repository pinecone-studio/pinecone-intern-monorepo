'use client';
import { useState } from 'react';
import { PasswordStepOne } from './_components/PasswordStepOne';
export type PasswordStepOneProps = {
  setStep: (_step: number) => void;
  setEmail: (_email: string) => void;
};
export type PasswordStepTwoProps = {
  setStep: (_step: number) => void;
};
const ForgetPasswordPage = () => {
  const [step, setStep] = useState<number>(1);
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4" data-cy="forget-password-page">
      <div className="max-w-md w-full space-y-6" data-cy="forget-password-container">
        <div className="text-center" data-cy="signup-header">
          <div className="text-4xl font-bold text-orange-600" data-cy="logo">
            🏠
          </div>
          <h2 className="text-2xl font-bold" data-cy="title">
            Home Vault
          </h2>
        </div>
        {step === 1 && <PasswordStepOne setStep={setStep} />}
      </div>
    </div>
  );
};
export default ForgetPasswordPage;
