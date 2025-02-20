import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '../../../../../../../libs/shadcn/src/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DatePickerProps {
  selectedDates: Date[];
  onDatesSelect: (_dates: Date[]) => void;
}

export const DatePicker = ({ selectedDates, onDatesSelect }: DatePickerProps) => {
  const [date, setDate] = React.useState<Date | undefined>(selectedDates[0] || undefined);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      onDatesSelect([selectedDate]);
    } else {
      onDatesSelect([]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger data-testid="dialogOpen" asChild>
        <Button data-testid="clearButton" role="button" variant={'outline'} className={cn('w-[240px] justify-start border text-left font-normal', !date && 'text-muted-foreground')}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Өдөр Сонгох</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus fromDate={new Date()} />
      </PopoverContent>
    </Popover>
  );
};
