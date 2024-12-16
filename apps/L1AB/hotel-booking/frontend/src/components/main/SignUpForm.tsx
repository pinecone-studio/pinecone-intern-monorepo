'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import SignUpFormEmailStep from './SignUpFormEmailStep';
import SignUpFormOtpStep from './SignUpFormOtpStep';
import SignUpFormPasswordStep from './SignUpFormPasswordStep';
import { useSignUpMutation } from '@/generated';

const SignUpForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');

  const [signUpMutation, { loading: signUpLoading, error: signUpError }] = useSignUpMutation();

  const nextHandler = () => setStep((prev) => prev + 1);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <SignUpFormEmailStep setEmail={setEmail} nextHandler={nextHandler} />;
      case 1:
        return <SignUpFormOtpStep email={email} nextHandler={nextHandler} />;
      case 2:
        return <SignUpFormPasswordStep email={email} signUpMutation={signUpMutation} signUpLoading={signUpLoading} signUpError={signUpError} />;
    }
  };

  return (
    <div data-testid="sign-up-form" className="w-screen h-screen flex justify-center items-center">
      <Card className="w-full max-w-[350px] mx-auto bg-white   rounded-md border-none shadow-none">
        <CardHeader className="text-center flex-row justify-center items-center gap-2">
          <div className="w-5 h-5 bg-[#2563EB] rounded-full"></div>
          <h4 className="text-2xl font-light font-sans text-end pb-2">Pedia</h4>
        </CardHeader>
        <CardContent>{renderStep()}</CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
