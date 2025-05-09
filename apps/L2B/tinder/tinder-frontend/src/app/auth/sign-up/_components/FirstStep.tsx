import React from 'react';
import { StepOneProps } from '../_feature/SignUpSteps';

const FirstStep = ({ setStep, setEmail }: StepOneProps) => {
  return (
    <div className="flex flex-col mt-6 w-full">
      <p>1step</p>
      <button onClick={() => setStep(2)}>
        <input type="gmail" onChange={(e) => setEmail(e.target.value)} />
      </button>
    </div>
  );
};

export default FirstStep;
