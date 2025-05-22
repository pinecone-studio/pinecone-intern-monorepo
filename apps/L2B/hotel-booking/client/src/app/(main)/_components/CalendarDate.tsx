/* eslint-disable camelcase */
'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const DateRangePicker = ({ date, handleDateChange }: { date: DateRange | undefined; handleDateChange: (_newDate?: DateRange) => void }) => {
  function renderDateRange() {
    if (!date?.from) {
      return <span>Pick a date</span>;
    }

    if (date.to) {
      return (
        <>
          {format(date.from, 'MMMM d')} - {format(date.to, 'MMMM d')}
        </>
      );
    }

    return format(date.from, 'MMMM d');
  }

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            data-testid="calendar-button"
            id="date"
            variant="outline"
            className={`w-full justify-between text-left text-sm  h-[38px] mt-[1px] px-4 py-4 border-[1px] rounded-l  ', ${!date && 'text-muted-foreground'}`}
          >
            <span className="text-sm font-normal">{renderDateRange()}</span>
            <CalendarIcon className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 " align="start">
          <Calendar
            initialFocus
            mode="range"
            classNames={{
              day_selected: 'bg-blue-500 text-white ',
            }}
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
