'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { DateRange } from 'react-day-picker';

const DiscountCalendar = () => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);

  function handleSelect(range: DateRange | undefined) {
    if (!range || !range.from) return;
    if (range.to) {
      const diffDays = (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24) + 1;
      if (diffDays >= 1) {
        setSelectedRange(range);
      } else {
        setSelectedRange({ from: range.from });
      }
    } else {
      setSelectedRange({ from: range.from });
    }
  }

  return (
    <div className="flex items-center justify-center mt-4 mb-3 w-[291px] border rounded-lg">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <span className="mr-2">📅</span>
            {selectedRange?.from
              ? selectedRange.to
                ? `${selectedRange.from.toLocaleDateString()} - ${selectedRange.to.toLocaleDateString()}`
                : `${selectedRange.from.toLocaleDateString()}`
              : 'Хугацаа сонгох'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="range" selected={selectedRange} onSelect={handleSelect} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DiscountCalendar;