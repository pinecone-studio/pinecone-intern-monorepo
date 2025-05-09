import React from 'react';
import { StepOneProps } from '../_feature/SignUpSteps';

const FirstStep = ({ setStep, setEmail }: StepOneProps) => {
  return (
    <div className="flex flex-col mt-6 w-full">
      <button onClick={() => setStep(2)}>next step</button>
      <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="email" />
    </div>
  );
};

export default FirstStep;
