'use client';

import React, { useState } from 'react';
import { ConfirmEmail } from './ConfirmEmail';
import { EmailForm } from './EmailForm';
import { UserData } from '@/app/(auth)/signup/page';
import { OtpType } from '@/generated';

type Props = {
  updateUserData: (_: Partial<UserData>) => void;
};

export const ForgetPassword = ({ updateUserData }: Props) => {
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
    return <ConfirmEmail email={submittedEmail} onSuccess={handleOtpSuccess} updateUserData={updateUserData} otpType={OtpType.Forgot} />;
  }

  return <EmailForm onSuccess={handleEmailSubmitSuccess} />;
};
