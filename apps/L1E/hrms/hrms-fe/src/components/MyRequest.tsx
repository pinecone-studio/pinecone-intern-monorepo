'use client';

import { Leave } from './Leave';
import { PaidLeave } from './PaidLeave';
import { RemoteWork } from './RemoteWork';
import RequestStory from './RequestStory';

export const MyRequest = () => {
  return (
    <div className="flex flex-col w-[684px] items-center justify-center mt-[200px]">
      <div className="flex flex-row gap-5 items-center justify-center">
        <RemoteWork availableDays={3} totalRemoteDays={5} />
        <PaidLeave availablePaidDays={3} totalPaidLeaveDays={5} />
        <Leave totalFreeTime={10} />
      </div>
      <div className="flex flex-col">
        <div className="text-xl font-semibold mt-6">Миний явуулсан хүсэлтүүд:</div>
        <RequestStory />
      </div>
    </div>
  );
};
