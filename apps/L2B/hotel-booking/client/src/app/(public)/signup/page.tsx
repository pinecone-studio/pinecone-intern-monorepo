'use client';
import { useState } from 'react';
import { Email } from './_feature/Email';
import { Password } from './_feature/Password';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const FormSteps = [Email, Password][currentStep];

  return <FormSteps currentStep={currentStep} setCurrentStep={setCurrentStep} email={email} setEmail={setEmail} />;
};
export default SignUpPage;
