'use client';
import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateYearOptions, MIN_YEAR, MONTHS, validateDate } from './date-utils';

type UserData = {
  dob?: Date;
};

type Props = {
  onSuccess?: (_date: Date) => void;
  onBack?: () => void;
  initialDate?: Date;
  currentDate?: Date;
  updateUserData?: (_data: Partial<UserData>) => void;
};

const HowOldAreYou = ({ onSuccess, onBack, initialDate, currentDate = new Date() }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate);
  const [month, setMonth] = useState<Date>(initialDate || new Date());
  const [error, setError] = useState('');
  const [isOpen, setOpen] = useState(false);

  const years = useMemo(() => generateYearOptions(currentDate.getFullYear()).reverse(), [currentDate]);

  const isDisabled = useCallback((date: Date) => date > currentDate || date < new Date(MIN_YEAR, 0, 1), [currentDate]);

  const handleSubmit = () => {
    const validation = validateDate(selectedDate, currentDate);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }
    setError('');
    if (selectedDate) onSuccess?.(selectedDate);
  };

  const handleSelectChange = (type: 'year' | 'month', value: string) => {
    const newDate = new Date(month);
    if (type === 'year') newDate.setFullYear(Number(value));
    else newDate.setMonth(Number(value));
    setMonth(newDate);

    if (!selectedDate) setSelectedDate(newDate);
  };

  return (
    <div className="flex items-center justify-center pt-4">
      <div className="w-[336px] bg-white">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">How old are you?</h1>
          <p className="mt-1 text-sm text-gray-500">Please enter your date of birth to continue</p>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Date of birth</label>
          <Popover open={isOpen} onOpenChange={setOpen}>
            <PopoverTrigger asChild data-testid="popover-trigger">
              <Button variant="outline" className="justify-between w-full font-normal text-left border rounded-lg bg-gray-50 hover:bg-gray-100" data-testid="date-button">
                {selectedDate ? format(selectedDate, 'PPP') : <span className="text-[#71717A]">Pick a date</span>}
                <CalendarIcon className="w-4 h-4 ml-2 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[335px] p-4" align="start">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <Select value={String(month.getFullYear())} onValueChange={(v) => handleSelectChange('year', v)} data-testid="year-select">
                    <SelectTrigger data-testid="year-select-trigger">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      {years.map((y) => (
                        <SelectItem key={y} value={String(y)}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={String(month.getMonth())} onValueChange={(v) => handleSelectChange('month', v)} data-testid="month-select">
                    <SelectTrigger data-testid="month-select-trigger">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {MONTHS.map((m, i) => (
                        <SelectItem key={i} value={String(i)}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Calendar
                  className="pl-6"
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    if (date) {
                      setError('');
                      setOpen(false);
                    }
                  }}
                  month={month}
                  onMonthChange={setMonth}
                  disabled={isDisabled}
                  initialFocus
                  data-testid="calendar-component"
                />
              </div>
            </PopoverContent>
          </Popover>

          <p className="text-xs text-[#71717A]">Your date of birth is used to calculate your age.</p>

          {error && (
            <div className="p-3 border border-red-200 rounded-lg bg-red-50" data-testid="error-message">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          {onBack && (
            <Button variant="outline" className="rounded-full px-6 py-2 border bg-white text-gray-700 hover:bg-[#E11D48E5] hover:text-white" onClick={onBack} data-testid="back-button">
              Back
            </Button>
          )}
          <Button data-testid="next-button" className="rounded-full px-6 py-2 border bg-white text-gray-700 hover:bg-[#E11D48E5] hover:text-white" onClick={handleSubmit}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowOldAreYou;
