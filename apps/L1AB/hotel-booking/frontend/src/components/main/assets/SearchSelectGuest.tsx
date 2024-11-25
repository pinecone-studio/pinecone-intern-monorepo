'use client';

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface SearchSelectGuestProps {
  value: number;
  onChange: (_guests: number) => void;
}
export const SearchSelectGuest = ({ value, onChange }: SearchSelectGuestProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [adult, setAdult] = React.useState<number>(value);

  const handleDoneClick = () => {
    setIsOpen(false);
  };
  const handlePlusClick = () => {
    const newAdultCount = adult + 1;
    setAdult(newAdultCount);
    onChange(newAdultCount);
  };
  const handleMinusClick = () => {
    const newAdultCount = Math.max(adult - 1, 1);
    setAdult(newAdultCount);
    onChange(newAdultCount);
  };
  return (
    <Select data-testid="guest-select" value={adult.toString()} open={isOpen} onOpenChange={setIsOpen}>
      <SelectTrigger data-testid="select-trigger" className="w-full">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent style={{ width: 'calc(100% - 40px)' }} className="p-5">
        <div style={{ width: 'calc(100% - 40px)' }} className="space-y-3">
          <p className="text-lg font-semibold">Travels</p>
          <div className="text-end">
            <div className="flex justify-between">
              <p>Adult</p>
              <div className="flex">
                <Button data-testid="minus" className="bg-white text-black border hover:bg-gray-50" onClick={handleMinusClick}>
                  -
                </Button>
                <div className="w-10 h-10 flex items-center justify-center">{adult}</div>
                <Button data-testid="plus" className="bg-white text-black border hover:bg-gray-50" onClick={handlePlusClick}>
                  +
                </Button>
              </div>
              <SelectItem className="hidden" value={adult.toString()}>
                {adult} traveller, 1 room
              </SelectItem>
            </div>
            <div className="border-t my-4"></div>
            <Button data-testid="select-done" onClick={handleDoneClick} className="bg-blue-600">
              Done
            </Button>
          </div>
        </div>
      </SelectContent>
    </Select>
  );
};
