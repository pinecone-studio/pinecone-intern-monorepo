'use client';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '../../../../../../../libs/shadcn/src/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { HTMLAttributes } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DatePickerProps extends HTMLAttributes<HTMLDivElement> {
  selectedDates?: Date[];
  onDatesSelect: (_dates: Date[] | undefined) => void;
}

export const DatePicker = ({ className, selectedDates, onDatesSelect }: DatePickerProps) => {
  return (
    <div className={cn('grid gap-2 border rounded-md', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" variant={'outline'} className={cn('w-[231px] justify-start text-left font-normal', !selectedDates?.length && 'text-muted-foreground')}>
            <CalendarIcon />
            {selectedDates?.length ? <div className="flex flex-wrap gap-1">{selectedDates.map((date) => format(date, 'yyyy.MM.dd')).join(', ')}</div> : <span>өдөр сонгох</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar initialFocus mode="multiple" selected={selectedDates} onSelect={onDatesSelect} numberOfMonths={1} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
