'use client';
import React, { useState } from 'react';
import FirstStep from './FirstStep';
import SecondStep from '../_components/SecondStep';
import ThirdStep from '../_components/ThirdStep';
import FourthStep from '../_components/FourthStep';
import FifthStep from '../_components/FifthStep';
import Image from 'next/image';

const CreateAccountSteps = () => {
  const [step, setStep] = useState<number>(0);
  const Steps = [FirstStep, SecondStep, ThirdStep, FourthStep, FifthStep][step];
  return (
    <div className="flex flex-col gap-[24px]  w-full items-center mt-[80px]">
      <Image src="/tinder.svg" width={100} height={25} alt="logo" />
      <Steps setStep={setStep} />
    </div>
  );
};

export default CreateAccountSteps;
