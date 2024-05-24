'use client';
import { useEffect, useState } from 'react';
import { headers } from './utils/Table';
import { LeaveRequest, useGetRequestsQuery } from '../../../generated';
import Status from '../_components/Status';
import { useRouter } from 'next/navigation';
import { formatDate } from '../_components/Date';
import FilterByToday from '../_components/FilterByToday';

const Requests = () => {
  const router = useRouter();
  const [filteredData, setFilteredData] = useState<LeaveRequest[]>([]);
  const { data, loading, refetch } = useGetRequestsQuery();

  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [refetch]);

  const filterDataByToday = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayRequests = (data?.getRequests || []).filter((dat) => new Date(dat.startDate).toISOString().split('T')[0] === today) as LeaveRequest[];
    setFilteredData(todayRequests);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center pt-10">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  const requestsToShow = filteredData.length > 0 ? filteredData : data?.getRequests;

  return (
    <div className="py-10">
      <div className="flex flex-col gap-6 p-6 bg-white rounded-lg">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold">Чөлөө</h1>
          <p>{new Date().toISOString().split('T')[0]}</p>
        </div>
        <div className="flex justify-between">
          <div role="tablist" className="tabs tabs-bordered">
            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Хүсэлт" defaultChecked />
            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Ажилчид" />
            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Түүх" />
          </div>
          <FilterByToday onClick={filterDataByToday} data-testid="filter-by-today" />
        </div>
        <div className="flex flex-col gap-6 bg-gray-100">
          <div className="overflow-x-auto shadow-md rounded-lg">
            <div className="w-full max-h-[500px] overflow-y-auto bg-white">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-base-200">
                    {headers.map((header, index) => (
                      <th key={index} className="p-4 w-1/5 text-left">
                        <p className="text-md font-semibold text-dark">{header}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {requestsToShow?.map((dat, index) => (
                    <tr key={index} className="border-solid border-b border-b-[#EDE6F0] cursor-pointer" onClick={() => router.push(`/leaving/Detail/?requestId=${dat?._id}`)} data-testid="requests">
                      <td className="p-4 w-1/5 truncate">{dat?.name}</td>
                      <td className="p-4 w-1/5 truncate text-[#3F4145]">{dat?.leaveType}</td>
                      <td className="p-4 w-1/5 truncate text-[#3F4145]">{dat?.startDate ? formatDate(dat.startDate) : ''}</td>
                      <td className="p-4 w-1/5 truncate text-[#3F4145]">{dat?.totalHour}</td>
                      <td className="p-4 w-1/5 truncate text-[#3F4145]">{dat?.superVisor}</td>
                      <td className="p-4 w-1/5 truncate" data-testid="request-status">
                        {dat && <Status dat={dat} />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;
