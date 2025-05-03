'use client';
import { useState } from "react";
import { StepOne } from "./_components/StepOne";
import { StepThree } from "./_components/StepThree";

export type StepOneProps = {
  setStep: (_step: number) => void;
};

const SignUpPage = () => {
  const [step, setStep] = useState<number>(1);
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4" data-cy="signup-page">
      <div className="max-w-md w-full space-y-6" data-cy="signup-container">
        <div className="text-center" data-cy="signup-header">
          <div className="text-4xl font-bold text-orange-600" data-cy="logo">🏠</div>
          <h2 className="text-2xl font-bold" data-cy="title">Home Vault</h2>
          <p className="mt-2 text-gray-600" data-cy="subtitle">Enter your email below to sign in</p>
        </div>

        {step === 1 && <StepOne setStep={setStep} />}
        {step === 3 && <StepThree />}

        <div className="text-center text-sm text-gray-500" data-cy="signup-or-section">
          OR
          <div className="mt-2">
            <a href="/signup" className="underline text-blue-600" data-cy="signup-link">
              Create an account
            </a>
          </div>
          <p className="mt-6 text-xs">
            By clicking continue, you agree to our{' '}
            <a href="#" className="underline" data-cy="tos-link">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="underline" data-cy="privacy-link">
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <p className="text-xs text-center text-gray-400 mt-6" data-cy="copyright">
          ©2024 Home Vault
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
