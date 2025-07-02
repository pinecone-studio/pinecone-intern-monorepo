'use client';
import { useState } from 'react';
import { ForgetPasswordEmail } from './_features/ForgetPasswordEmail';
import { ForgetPasswordNew } from './_features/ForgetPasswordNew';
import { ForgetPasswordOtp } from './_features/ForgetPasswordStep3';

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div data-cy="forget-password-page">
      {currentStep === 0 && <ForgetPasswordEmail setEmail={setEmail} setCurrentStep={setCurrentStep} />}
      {currentStep === 1 && <ForgetPasswordOtp email={email} setCurrentStep={setCurrentStep} />}
      {currentStep === 2 && <ForgetPasswordNew email={email} />}
    </div>
  );
};
export default ForgetPasswordPage;
