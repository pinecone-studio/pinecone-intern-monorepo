'use client';

import { Leave } from './Leave';
import { PaidLeave } from './PaidLeave';
import { RemoteWork } from './RemoteWork';
interface MyRequestProps {
  availableDays: number | undefined;
  timeleave: number | undefined;
  availablePaidDays: number | undefined;
}
export const MyRequest = ({ availableDays, availablePaidDays, timeleave }: MyRequestProps) => {
  return (
    <div className="flex flex-row gap-5    ">
      <RemoteWork availableDays={availableDays} />
      <PaidLeave availablePaidDays={availablePaidDays} />
      <Leave timeleave={timeleave} />
    </div>
  );
};
