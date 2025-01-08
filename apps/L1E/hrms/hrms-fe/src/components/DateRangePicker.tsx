'use client';
import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DateRange } from 'react-day-picker';

interface DateRangePickerProps {
  setDate: (_date: DateRange | undefined) => void;
  date: DateRange | undefined;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ setDate, date }) => {
  return (
    <div className={`grid gap-2`} data-testid="date-range-picker">
      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" variant="outline" data-testid="calendar-btn" data-cy={'date-picker'} className={`w-[300px] justify-start text-left font-normal `}>
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar data-cy={'calendar-content'} initialFocus data-testid="calendar" mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
