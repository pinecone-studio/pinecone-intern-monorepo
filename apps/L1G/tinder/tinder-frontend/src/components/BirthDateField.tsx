import { useFormContext } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateYearOptions, MIN_YEAR, MONTHS } from './date-utils';
import { FormDescription, FormItem, FormMessage } from '@/components/ui/form';

type Props = { 
  initialDate?: Date; 
  currentDate?: Date; 
};

export const BirthDateField = ({ initialDate, currentDate = new Date() }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate);
  const [month, setMonth] = useState<Date>(initialDate || new Date());
  const [isOpen, setOpen] = useState(false);

  const { setValue, watch } = useFormContext();
  const formBirthDate = watch('birthDate');

  useEffect(() => {
    if (initialDate) {
      setSelectedDate(initialDate);
      setMonth(initialDate);
    }
  }, [initialDate]);

  useEffect(() => {
    if (formBirthDate && !selectedDate) {
      setSelectedDate(formBirthDate);
      setMonth(formBirthDate);
    }
  }, [formBirthDate, selectedDate]);

  const years = useMemo(
    () => generateYearOptions(currentDate.getFullYear()).reverse(),
    [currentDate]
  );

  const isDisabled = useCallback(
    (date: Date) => date > currentDate || date < new Date(MIN_YEAR, 0, 1),
    [currentDate]
  );

  const handleSelectChange = (type: 'year' | 'month', value: string) => {
    const newDate = new Date(month);
    if (type === 'year') newDate.setFullYear(Number(value));
    else newDate.setMonth(Number(value));
    setMonth(newDate);

    // Remove this automatic date setting - let user explicitly select a date
    // if (!selectedDate) setSelectedDate(newDate);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setOpen(false);
      setValue('birthDate', date, { shouldValidate: true });
    }
  };

  return (
    <FormItem className="flex flex-col">
      <Popover open={isOpen} onOpenChange={setOpen}>
        <PopoverTrigger asChild data-testid="qpopover-trigger">
          <Button
            variant="outline"
            className="justify-between w-full font-normal text-left border rounded-lg bg-gray-50 hover:bg-gray-100"
            data-testid="qdate-button"
          >
            {selectedDate ? (
              format(selectedDate, 'PPP')
            ) : (
              <span className="text-[#71717A]">Pick a date</span>
            )}
            <CalendarIcon className="w-4 h-4 ml-2 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[335px] p-4" align="start">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <Select
                value={String(month.getFullYear())}
                onValueChange={(v) => handleSelectChange('year', v)}
                data-testid="qyear-select"
              >
                <SelectTrigger data-testid="qyear-select-trigger">
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

              <Select
                value={String(month.getMonth())}
                onValueChange={(v) => handleSelectChange('month', v)}
                data-testid="qmonth-select"
              >
                <SelectTrigger data-testid="qmonth-select-trigger">
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
              onSelect={handleDateSelect}
              month={month}
              onMonthChange={setMonth}
              disabled={isDisabled}
              initialFocus
              data-testid="qcalendar-component"
            />
          </div>
        </PopoverContent>
      </Popover>
      <FormDescription>Your date of birth is used to calculate your age.</FormDescription>
      <FormMessage />
    </FormItem>
  );
};