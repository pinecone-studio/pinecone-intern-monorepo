'use client';

import { MyRequest } from '@/components/MyRequest';
import RequestStory from '@/components/RequestStory';
import { Employee, Request, useGetRequestsByEmployeeQuery } from '@/generated';
import { useUser } from '@/provider/UserProvider';
import { addDays, eachDayOfInterval } from 'date-fns';
import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';

const Page = () => {
  const { user } = useUser();

  const { data: requestsData } = useGetRequestsByEmployeeQuery({
    variables: { employeeId: user?._id || '' },
  });

  const employee = user as Employee;
  const requests = requestsData?.getRequestsByEmployee as Request[];

  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -3),
    to: new Date(),
  });

  const availableDays = employee?.remoteLimit;
  const availablePaidDays = employee?.paidLeaveLimit;
  const timeleave = employee?.freeLimit;

  const [daysArray, setDaysArray] = useState<Date[]>([]);

  useEffect(() => {
    if (date?.from && date?.to) {
      setDaysArray(
        eachDayOfInterval({
          start: date.from,
          end: date.to,
        })
      );
    }
  }, [date]);
  return (
    <div data-cy="my-requests-page" className="flex flex-col h-screen items-center w-screen pt-[200px] bg-neutral-100 " data-testid="page-container">
      <MyRequest availableDays={availableDays} availablePaidDays={availablePaidDays} timeleave={timeleave} />
      <RequestStory daysArray={daysArray} date={date} setDate={setDate} requestsData={requests} />
    </div>
  );
};

export default Page;
