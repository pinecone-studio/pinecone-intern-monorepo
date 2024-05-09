'use client';
import React from 'react';
import { TDay } from './DataMatrix';


type DayProps = {
  data: TDay[];
};

export const Day = ({ data }: DayProps)=> {
  return (
    <div className="flex flex-col py-2 px-2 m-auto place-items-center">
      {data.map((requests, requestsIndex) => (
        <p data-testid="requestName" key={requestsIndex} className={'text-[12px] my-1 rounded-md px-2 py-2 w-fit ' + (requests.leaveType === 'MEDICAL' ? 'text-[#16A94A] bg-[#EAF6ED]' : 'text-[#1890FF] bg-[#E8F4FF]')}>
          {requests.name}
        </p>
      ))}
    </div>
  );
}
