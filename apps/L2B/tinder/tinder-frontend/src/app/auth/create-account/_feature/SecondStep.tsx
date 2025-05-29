'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React from 'react';
import calculateAge from '@/app/utils/calculate-age';

const SecondStep = ({ setStep, updateFormData }: { setStep: (_step: number) => void, updateFormData: (_data: any) => void }) => {
  const [date, setDate] = React.useState<Date>();
  const [error, setError] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleNext = () => {
    if (date) {
      setError(false);
      const age = calculateAge(date.toISOString());
      updateFormData({ age: age });
      setStep(2);
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center h-full justify-between bg-white">
      <div className="w-[400px] max-w-md space-y-8 px-4 py-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-gray-900">How old are you</h1>
          <p className="text-sm text-gray-500">Please enter your age to continue.</p>
        </div>
        <div className="space-y-6 pt-4">
          <div className="space-y-2">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of birth
            </label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button name="day" variant="outline" className={`w-full border flex h-full justify-between ${error ? 'border-red-500 text-red-500' : ''}`}>
                  <p>{date ? format(date, 'PPP') : 'Pick a date'}</p>
                  <CalendarIcon className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setError(false);
                    setOpen(false);
                  }}
                  className="rounded-md border shadow"
                  data-testid="calendar-root"
                />
              </PopoverContent>
            </Popover>
            {error ? (
              <p data-error={error} className={`data-[error=true]:text-red-500 text-gray-500 text-[14px] `}>
                Please select your date of birth.
              </p>
            ) : (
              <p className="text-[14px] text-[#71717a]">Your date of birth is used to calculate your age.</p>
            )}
          </div>
          <div className="flex justify-between pt-4">
            <Button variant="outline" className="w-[65px] text-black border rounded-full" onClick={() => setStep(0)} data-cy="2step-back-button">
              Back
            </Button>
            <Button onClick={handleNext} className="w-[65px] rounded-full bg-rose-500 hover:bg-rose-600">
              Next
            </Button>
          </div>
        </div>
      </div>
      <div className="py-4 mt-[120%] text-center font-[Inter] tracking-widest text-[16px] text-[#71717a]">©2024 Tinder</div>
    </div>
  );
};

export default SecondStep;

