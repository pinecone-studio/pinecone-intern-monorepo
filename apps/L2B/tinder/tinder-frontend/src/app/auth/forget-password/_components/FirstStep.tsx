'use client';
import React, { useState } from 'react';
import { StepOneProps } from '../_feature/ForgetPasswordSteps';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const FirstStep = ({ setStep, setEmail }: StepOneProps) => {
  const [emailValue, setEmailValue] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue.trim()) {
      setError('Email is required');
      return;
    }
    if (!emailRegex.test(emailValue)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setEmail(emailValue);
    setStep(2);
  };
  return (
    <div className="w-[350px]">
      <div className="w-full text-center mb-6">
        <h1 className="text-2xl font-semibold mb-1">Forget password</h1>
        <p className="text-gray-500 text-sm">Enter your email account to reset password</p>
      </div>

      <div className="w-full space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} placeholder="email" />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <Button data-testid="forget-password-firstStep-button" onClick={() => handleContinue()} type="submit" className="w-full bg-[#fe3c72] hover:bg-[#e62a5b] text-white rounded-full">
          Continue
        </Button>
      </div>
    </div>
  );
};
export default FirstStep;
