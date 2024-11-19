'use client';

import * as React from 'react';
import { addDays } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export const DatePickerWithRange = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 10, 20),
    to: addDays(new Date(2024, 11, 20), 20),
  });

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" variant={'outline'} className="w-[300px] justify-start text-left font-normal">
            <CalendarIcon />
            <span>Өдөр сонгох</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
