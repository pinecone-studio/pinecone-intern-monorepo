'use client';
import { Button } from '@/components/ui/button';

import { Leave } from './Leave';
import { PaidLeave } from './PaidLeave';
import { RemoteWork } from './RemoteWork';
import RequestStory from './RequestStory';

export const MyRequest = () => {
  return (
    <div className="flex flex-col mt-[200px]">
      <div className="flex flex-row gap-5 items-center justify-center">
        <RemoteWork availableDays={3} totalRemoteDays={5} />
        <PaidLeave availablePaidDays={3} totalPaidLeaveDays={5} />
        <Leave />
      </div>
      <div className="ml-[780px]">
        <div className="text-xl font-semibold mt-6">Миний явуулсан хүсэлтүүд:</div>
        <div className="flex flex-row mt-4">
          <Button className="flex ml-[262px]">+ Чөлөө хүсэх</Button>
        </div>
        <RequestStory />
      </div>
    </div>
  );
};
