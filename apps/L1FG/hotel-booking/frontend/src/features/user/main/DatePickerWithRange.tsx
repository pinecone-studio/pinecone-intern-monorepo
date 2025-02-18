'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HTMLAttributes, useEffect, useState } from 'react';
import { cn } from '../../../../../../../../libs/shadcn/src/lib/utils';
import { useQueryState } from 'nuqs';

export const DatePickerWithRange = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const [dateFrom, setDateFrom] = useQueryState('dateFrom', { defaultValue: '' });
  const [dateTo, setDateTo] = useQueryState('dateTo', { defaultValue: '' });
  const [date, setDate] = useState<DateRange | undefined>({ from: dateFrom ? new Date(dateFrom) : undefined, to: dateTo ? new Date(dateTo) : undefined });

  useEffect(() => {
    if (date?.from && date.to) {
      setDateFrom(date?.from?.toISOString());
      setDateTo(date?.to?.toISOString());
    } else {
      setDateFrom('');
      setDateTo('');
    }
  }, [date, setDateFrom, setDateTo]);

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" variant={'outline'} className={cn('w-full rounded-[6px] justify-between h-10 text-left font-normal px-4 py-2 border border-[#E4E4E7]')}>
            {date?.from && date?.to ? (
              <>
                {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
              </>
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon size={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar disabled={{ before: new Date() }} initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
