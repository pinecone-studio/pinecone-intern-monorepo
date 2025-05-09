import React from 'react';
import { StepOneProps } from '../_feature/ForgetPasswordSteps';

const FirstStep = ({ setStep, setEmail }: StepOneProps) => {
  return (
    <div>
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="email"
      />
      <button onClick={() => setStep(2)}>next step</button>
    </div>
  );
};

export default FirstStep;
