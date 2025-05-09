import React from 'react';
import { StepOneProps } from '../_feature/SignUpSteps';

const FirstStep = ({ setStep, setEmail }: StepOneProps) => {
  return (
    <div className="flex flex-col mt-6 w-full">
      <p>1step</p>
      <button onClick={() => setStep(2)}>next step</button>
    </div>
  );
};

export default FirstStep;
