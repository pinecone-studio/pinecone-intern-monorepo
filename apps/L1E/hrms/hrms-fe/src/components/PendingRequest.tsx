'use client';

import { Input } from '@/components/ui/input';
import { GoSearch } from 'react-icons/go';
import StatusSelector from './StatusSelector';
import { RequestList } from './RequestList';
import { RequestApproved } from './RequestApproved';
import { Employee, EmployeeStatus, GetAllRequestsQuery, Request, useGetAllRequestsQuery } from '@/generated';
import { useState } from 'react';
export const PendingRequest = () => {
  const employee: Employee = {
    _id: '676e6de507d5ae05a35cda88',
    email: 'jvk2344@gmail.com',
    jobTitle: 'senior',
    username: 'jvkaa',
    adminStatus: false,
    remoteLimit: 5,
    paidLeaveLimit: 5,
    freeLimit: 5,
    employeeStatus: EmployeeStatus.Lead,
    createdAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
    updatedAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
  };
  const { data } = useGetAllRequestsQuery({ variables: { limit: 100 } });
  const [selectId, setSelectId] = useState<string>();

  if (!data) return <div>Loading</div>;

  const allRequests = data.getAllRequests as GetAllRequestsQuery['getAllRequests'];

  const filteredRequest = allRequests?.filter((e) => e?.leadEmployeeId?._id === employee._id);

  return (
    <div className="flex flex-col h-screen gap-5 w-[1030px] mx-auto mt-10 ">
      <div className="text-xl font-semibold">Хүсэлтүүд</div>
      <div className="flex flex-row gap-[220px]">
        <div className="flex flex-col ">
          <div className="flex gap-4 mt-4">
            <Input type="search" placeholder="Хайлт" className="w-[236px] h-[40px] flex absolute pl-9 " />
            <GoSearch className="flex relative ml-3 mt-3" />
          </div>
        </div>
        <StatusSelector />
      </div>
      <div className="flex flex-row gap-2">
        <RequestList setSelectId={setSelectId} filteredRequest={filteredRequest as Request[]} />
        <RequestApproved selectId={selectId} />
      </div>
    </div>
  );
};
