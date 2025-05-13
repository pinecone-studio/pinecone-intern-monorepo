'use client';
import { useState } from 'react';
import { ForgetPasswordEmail } from './_features/ForgetPasswordEmail';
import { ForgetPasswordNew } from './_features/ForgetPasswordNew';
import { ForgetPasswordOtp } from './_features/ForgetPasswordOTP';

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const handleComplete = () => {
    console.log('Password reset complete!');
  };

  return (
    <div data-cy="forget-password-page">
      {currentStep === 0 && <ForgetPasswordEmail setEmail={setEmail} setCurrentStep={setCurrentStep} />}
      {currentStep === 1 && <ForgetPasswordOtp email={email} setCurrentStep={setCurrentStep} />}
      {currentStep === 2 && <ForgetPasswordNew email={email} onComplete={handleComplete} />}
    </div>
  );
};
export default ForgetPasswordPage;
