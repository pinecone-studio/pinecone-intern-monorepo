'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export const GenderSelect = () => {
  const [selectedInterest, setSelectedInterest] = useState('');
  const router = useRouter();

  const handleNext = () => {
    if (selectedInterest) {
      console.log('Selected interest:', selectedInterest);
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 bg-white">
      <img src="/Tinder.png" alt="Tinder Logo" className="h-24 mb-2" />

      <h1 data-cy="Interest-Title" className="text-2xl font-semibold text-center">
        Who are you interested in?
      </h1>

      <p data-cy="Interest-Subtitle" className="text-sm text-gray-500 mb-8 text-center">
        Pick the one that feels right for you!
      </p>

      <div>
        <Select value={selectedInterest} onValueChange={setSelectedInterest}>
          <SelectTrigger className="w-[400px] sm:w-[350px] h-10" data-cy="Interest-Select">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Both">Both</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="mt-4 flex justify-end">
          <Button className="px-6 py-2 bg-[#E53958] hover:bg-[#d7334f] text-white rounded-full shadow-md" onClick={handleNext} disabled={!selectedInterest} data-cy="Next-Button">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
