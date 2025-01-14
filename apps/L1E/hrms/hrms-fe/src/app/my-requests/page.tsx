'use client';

import { MyRequest } from '@/components/MyRequest';
import RequestStory from '@/components/RequestStory';
import { useGetEmployeeByIdQuery, useGetRequestsByEmployeeQuery } from '@/generated';
import { addDays, eachDayOfInterval } from 'date-fns';
import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';

const Page = () => {
  const { data: employeeData } = useGetEmployeeByIdQuery({ variables: { getEmployeeByIdId: '676e6e4007d5ae05a35cda9e' } });
  const { data: requestsData } = useGetRequestsByEmployeeQuery({ variables: { employeeId: '676e6e4007d5ae05a35cda9e' } });

  const availableDays = employeeData?.getEmployeeById?.remoteLimit;
  const availablePaidDays = employeeData?.getEmployeeById?.paidLeaveLimit;
  const timeleave = employeeData?.getEmployeeById?.freeLimit;

  // const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');

  //   if (!token) {
  //     router.push('/login');
  //   }
  // }, [router]);

  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -3),
    to: new Date(),
  });

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
    <div data-cy="my-requests-page" className="flex flex-col h-screen items-center w-screen mt-[200px]" data-testid="page-container">
      <MyRequest availableDays={availableDays} availablePaidDays={availablePaidDays} timeleave={timeleave} />
      <RequestStory daysArray={daysArray} date={date} setDate={setDate} requestsData={requestsData} />
    </div>
  );
};

export default Page;
