'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import SignUpFormEmailStep from './SignUpFormEmailStep';
import SignUpFormOtpStep from './SignUpFormOtpStep';
import SignUpFormPasswordStep from './SignUpFormPasswordStep';
import { useSignUpMutation, useSignUpSendOtpMutation } from '@/generated';

const SignUpForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const [signUpSendOtpMutation, { loading: otpLoading, error: otpError }] = useSignUpSendOtpMutation();
  const [signUpMutation, { loading: signUpLoading, error: signUpError }] = useSignUpMutation();

  const nextHandler = () => setStep((prev) => prev + 1);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <SignUpFormEmailStep setEmail={setEmail} nextHandler={nextHandler} signUpSendOtpMutation={signUpSendOtpMutation} otpLoading={otpLoading} otpError={otpError} />;
      case 1:
        return <SignUpFormOtpStep setOtp={setOtp} nextHandler={nextHandler} email={email} otp={otp} signUpMutation={signUpMutation} signUpLoading={signUpLoading} signUpError={signUpError} />;
      case 2:
        return <SignUpFormPasswordStep email={email} signUpMutation={signUpMutation} signUpLoading={signUpLoading} signUpError={signUpError} />;
    }
  };

  return (
    <div data-testid="sign-up-form" className="w-screen h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm mx-auto bg-white p-6 shadow-md rounded-md">
        <CardHeader className="text-center">
          <h4 className="text-2xl font-light">Sign Up</h4>
        </CardHeader>
        <CardContent>{renderStep()}</CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
