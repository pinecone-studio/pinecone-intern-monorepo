'use client';

import { Input } from '@/components/ui/input';
import { GoSearch } from 'react-icons/go';
import StatusSelector from './StatusSelector';
import { RequestList } from './RequestList';
import { RequestApproved } from './RequestApproved';

export const PendingRequest = () => {
  return (
    <div className="flex flex-col gap-5 w-[1030px] mx-auto mt-10 ">
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
        <RequestList />
        <RequestApproved />
      </div>
    </div>
  );
};
