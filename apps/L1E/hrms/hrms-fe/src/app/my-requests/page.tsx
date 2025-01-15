'use client';

import { MyRequest } from '@/components/MyRequest';
import RequestStory from '@/components/RequestStory';
import { Employee, Request, useGetEmployeeByIdLazyQuery, useGetRequestsByEmployeeLazyQuery } from '@/generated';
import { addDays, eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';

const Page = () => {
  const router = useRouter();

  const [employee, setEmployee] = useState<Employee>();
  const [requests, setRequests] = useState<Request[]>();

  const [getEmployeeById] = useGetEmployeeByIdLazyQuery();
  const [GetRequestsByEmployee] = useGetRequestsByEmployeeLazyQuery();

  const fetchData = async (token: string) => {
    const { data } = await getEmployeeById({ variables: { getEmployeeByIdId: token } });
    setEmployee(data?.getEmployeeById as Employee);
    const request = await GetRequestsByEmployee({ variables: { employeeId: token } });
    setRequests(request.data?.getRequestsByEmployee as Request[]);
  };

  useEffect(() => {
    const token = localStorage.getItem('token') as string;

    const parsedToken = JSON.parse(token);

    if (parsedToken) {
      fetchData(parsedToken);
    } else {
      router.push('/login');
    }
  }, [router]);

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
    <div data-cy="my-requests-page" className="flex flex-col h-screen items-center w-screen mt-[200px]" data-testid="page-container">
      <MyRequest availableDays={availableDays} availablePaidDays={availablePaidDays} timeleave={timeleave} />
      <RequestStory daysArray={daysArray} date={date} setDate={setDate} requestsData={requests} />
    </div>
  );
};

export default Page;
