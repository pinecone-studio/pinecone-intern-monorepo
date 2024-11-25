'use client';

import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from '@/components/icon';
import { DateRange } from 'react-day-picker';

interface SearchDatePickerProps {
  startDate?: Date;
  endDate?: Date;
  onChange: (_startDate: Date, _endDate: Date) => void;
}

export const SearchDatePicker = ({ startDate, endDate, onChange }: SearchDatePickerProps) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startDate,
    to: endDate,
  });
  React.useEffect(() => {
    if (date?.from && date?.to && (date.from !== startDate || date.to !== endDate)) {
      onChange(date.from, date.to);
    }
  }, [startDate, endDate, date?.from, date?.to, onChange]);
  return (
    <div data-testid="date-picker" className="grid gap-2 w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" variant={'outline'} className={`w-full justify-between truncate border h-10`}>
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLLL dd')} - {format(date.to, 'LLLL dd')}
                </>
              ) : (
                format(date.from, 'LLLL dd')
              )
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto -ml-5 p-0" align="start">
          <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
