'use client';

import React, { useState } from 'react';
import { ConfirmEmail } from './ConfirmEmail';
import { EmailForm } from './EmailForm';

export const ForgetPassword = () => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const handleEmailSubmitSuccess = (email: string) => {
    setSubmittedEmail(email);
    setStep('otp');
  };

  const handleOtpSuccess = () => {
    console.log('OTP verified successfully');
  };

  if (step === 'otp' && submittedEmail) {
    return <ConfirmEmail email={submittedEmail} onSuccess={handleOtpSuccess} />;
  }

  return <EmailForm onSuccess={handleEmailSubmitSuccess} />;
};
