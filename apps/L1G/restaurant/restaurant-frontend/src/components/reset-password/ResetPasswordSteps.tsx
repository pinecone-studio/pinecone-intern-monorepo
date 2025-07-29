'use client';

import { useState } from 'react';
import { StepOne } from './StepOne';
import { StepThree } from './StepThree';
import { StepTwo } from './StepTwo';

export const ResetPasswordSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const allSteps = [
    <StepOne key="step-one" handleNextStep={handleNextStep} />,
    <StepTwo key="step-two" handlePreviousStep={handlePreviousStep} handleNextStep={handleNextStep} />,
    <StepThree key="step-three" />,
  ][currentStep];
  return <div>{allSteps}</div>;
};
