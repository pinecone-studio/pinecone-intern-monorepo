'use client';
import Image from 'next/image';
import { useState } from 'react';

import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FirstStep from './FirstStep';

export type StepOneProps = {
  setStep: (_step: number) => void;
  setEmail: (_email: string) => void;
};

const ForgetPasswordSteps = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  return (
    <div className="flex flex-col gap-[24px] items-center">
      <Image src="/tinder.svg" width={100} height={24} alt="tinder" />

      {step === 1 && <FirstStep setStep={setStep} setEmail={setEmail} />}
      {step === 2 && <SecondStep setStep={setStep} email={email} />}
      {step === 3 && <ThirdStep email={email} />}
    </div>
  );
};

export default ForgetPasswordSteps;
