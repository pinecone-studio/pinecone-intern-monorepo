'use client';
import Image from 'next/image';
import { useState } from 'react';

import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FirstStep from './FirstStep';
import Link from 'next/link';

export type StepOneProps = {
  setStep: (_step: number) => void;
  setEmail: (_email: string) => void;
};

const SignUpSteps = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  return (
    <div className="flex flex-col items-center gap-[24px]">
      <Link href={'/'}>
        <Image src="/tinder.svg" width={100} height={24} alt="tinder" />
      </Link>

      {step === 1 && <FirstStep setStep={setStep} setEmail={setEmail} />}
      {step === 2 && <SecondStep setStep={setStep} email={email} />}
      {step === 3 && <ThirdStep email={email} />}
    </div>
  );
};

export default SignUpSteps;
