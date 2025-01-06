'use client';
import { Button } from '@/components/ui/button';

import { Leave } from './Leave';
import { PaidLeave } from './PaidLeave';
import { RemoteWork } from './RemoteWork';
import RequestStory from './RequestStory';
import { DateRangePicker } from './DateRangePicker';
import { addDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { useState } from 'react';

export const MyRequest = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -3),
    to: new Date(),
  });
  return (
    <div className="flex flex-col mt-[100px]">
      <div className="flex flex-row gap-5 items-center justify-center">
        <RemoteWork availableDays={3} totalRemoteDays={5} />
        <PaidLeave availablePaidDays={3} totalPaidLeaveDays={5} />
        <Leave totalFreeTime={10} />
      </div>
      <div className="ml-[380px] h-[800px]">
        <div className="text-xl font-semibold mt-6">Миний явуулсан хүсэлтүүд:</div>
        <div className="flex flex-row mt-4">
          <DateRangePicker setDate={setDate} date={date} />
          <Button className="flex ml-[262px]">+ Чөлөө хүсэх</Button>
        </div>
        <RequestStory />
      </div>
    </div>
  );
};
