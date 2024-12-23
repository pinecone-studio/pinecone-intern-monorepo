'use client';

import React, { useState, useEffect } from 'react';
import Logo from '../common/Logo';
import Title from '../common/Title';
import { Button } from '@/components/ui/button';
import { SelectDemo } from '../users/Select';
import DateOfBirth from './DateOfBirth';

export const InterestSelect = () => {
  const [selectedInterest, setSelectedInterest] = useState('');
  const [step, setStep] = useState('interest');

  useEffect(() => {
    const savedData = localStorage.getItem('signupFormData');
    if (!savedData) return;
    const parsedData = JSON.parse(savedData);
    setSelectedInterest(parsedData.interested);
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem('signupFormData');
    const parsedData = savedData ? JSON.parse(savedData) : {};
    parsedData.interested = selectedInterest;
    localStorage.setItem('signupFormData', JSON.stringify(parsedData));
  }, [selectedInterest]);

  const handleNext = () => {
    setStep('age');
  };

  return (
    <div className="w-screen h-screen justify-between items-center flex flex-col">
      {step === 'interest' && (
        <div className="w-screen h-screen flex justify-center mt-[80px]">
          <div className="w-[400px] h-[244px] gap-[24px] flex flex-col justify-center items-center">
            <Logo />
            <Title text="Who are you interested in?" desc="Pick the one that feels right for you!" />
            <SelectDemo data-testid="interested" selectedInterest={selectedInterest} setSelectedInterest={setSelectedInterest} />
            <div className="w-[400px] flex justify-end text-end">
              <Button data-testid="interest" className="bg-[#E11D48E5] text-white rounded-full w-[64px] h-[36px]" onClick={handleNext}>
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
      {step === 'age' && <DateOfBirth />}
    </div>
  );
};
