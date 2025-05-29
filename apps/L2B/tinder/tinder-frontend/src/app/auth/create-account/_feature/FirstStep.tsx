import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const FirstStep = ({ setStep, updateFormData }: { setStep: (_step: number) => void, updateFormData: (_data: any) => void } ) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [error, setError] = useState(false);

  const handleNextClick = () => {
    if (!selectedValue) {
      setError(true);
    } else {
      setError(false);
      updateFormData({ interestedIn: selectedValue });
      setStep(1);
    }
  };

  return (
    <div className="flex flex-col gap-[24px] items-end">
      <div className="flex flex-col justify-center items-center gap-1">
        <p className="text-[24px] font-bold tracking-[-0.6px]">Who are you interested in?</p>
        <p className="text-[14px] text-[#71717A]">Pick the one that feels right for you!</p>
      </div>

      <div className="w-full">
        <Select onValueChange={(value) => setSelectedValue(value)}>
          <SelectTrigger className={error ? 'border border-red-500' : ''}>
            <SelectValue data-testid="gender-select" placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male" data-testid="gender-male">
              Male
            </SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="both">Both</SelectItem>
          </SelectContent>
        </Select>
        {error && <p className="text-red-500 text-sm mt-1">Please select an option before continuing.</p>}
      </div>

      <Button onClick={handleNextClick} className="bg-red-500 rounded-full py-2 px-8 w-[40px]">
        Next
      </Button>
    </div>
  );
};

export default FirstStep;

