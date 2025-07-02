'use client';
import { useState } from 'react';
import { SignUpEmail } from './_feature/SignUpEmail';
import { SignUpPassword } from './_feature/SignUpPassword';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const FormSteps = [SignUpEmail, SignUpPassword][currentStep];

  return <FormSteps currentStep={currentStep} setCurrentStep={setCurrentStep} email={email} setEmail={setEmail} />;
};
export default SignUpPage;
