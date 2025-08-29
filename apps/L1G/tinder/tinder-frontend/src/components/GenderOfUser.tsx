'use client';

import React, { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import type { UserData } from '@/app/(auth)/signup/page';

type GenderOfUserProps = {
  onSuccess: () => void;
  onBack?: () => void;
  updateUserData: (_: Partial<UserData>) => void;
};

export const GenderOfUser = ({ onSuccess, updateUserData }: GenderOfUserProps) => {
  const [selectedInterest, setSelectedInterest] = useState('');

  const handleNext = () => {
    console.log('Selected user.s gender:', selectedInterest);
    updateUserData({ gender: selectedInterest });
    onSuccess();
  };

  return (
    <div className="w-full flex flex-col items-center justify-start bg-white">
      <h1 data-cy="Interest-Title" className="text-2xl font-sans font-semibold text-center">
        What’s your gender?
      </h1>

      <p data-cy="Interest-Subtitle" className="text-sm font-sans text-gray-500 mb-8 text-center">
        Please enter your gender to continue.
      </p>

      <div className="w-full">
        <Select value={selectedInterest} onValueChange={setSelectedInterest}>
          <SelectTrigger className="w-[340px] md:w-[360px] h-10" data-cy="Interest-Select" data-testid="select-trigger-gender">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="mt-4 flex justify-end">
          <Button
            type="submit"
            onClick={handleNext}
            className="px-6 py-2 bg-[#E53958] hover:bg-[#d7334f] text-white rounded-full shadow-md"
            disabled={!selectedInterest}
            data-cy="Gender-Next-Button"
            data-testid="Gender-Next-Button"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
