'use client';
import Image from 'next/image';
import { useState } from 'react';
import FirstStep from '../_components/FirstStep';
import SecondStep from '../_components/SecondStep';
import ThirdStep from '../_components/ThirdStep';


export type StepOneProps = {
  setStep: (_step: number) => void;
  setEmail: (_email: string) => void;
};

const ForgetPasswordSteps = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  return (
    <div className="flex flex-col gap-[24px] max-w-[350px] w-full">
      <Image src="/tinder.svg" width={100} height={24} alt="tinder" className='m-auto' />

      {step === 1 && <FirstStep setStep={setStep} setEmail={setEmail} />}
      {step === 2 && <SecondStep setStep={setStep} />}
      {step === 3 && <ThirdStep email={email} />}
    </div>
  );
};

export default ForgetPasswordSteps;
