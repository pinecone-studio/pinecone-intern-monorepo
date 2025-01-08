'use client';

import { PiTagThin } from 'react-icons/pi';
import { CiCalendar } from 'react-icons/ci';
import { Button } from '@/components/ui/button';
import { GetRequestsByEmployeeQuery } from '@/generated';
import { format, isEqual } from 'date-fns';
import { DateRangePicker } from './DateRangePicker';
import { DateRange } from 'react-day-picker';
import { Dispatch, SetStateAction } from 'react';

const statusMapping: Record<string, string> = {
  FREE: 'Чөлөө',
  PAID_LEAVE: 'Цалинтай чөлөө',
  REMOTE: 'Зайнаас ажиллах',
};

const typeMapping: Record<string, string> = {
  APPROVED: 'Баталгаажсан',
  PENDING: 'Хүлээгдэж байна',
  REJECTED: 'Татгалзсан',
};

interface RequestStoryProps {
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  daysArray: Date[];
  requestsData: GetRequestsByEmployeeQuery | undefined;
}

const RequestStory = ({ setDate, date, daysArray, requestsData }: RequestStoryProps) => {
  const reversedDays = [...daysArray].reverse();

  return (
    <div className="flex flex-col w-[684px]  gap-2 w-[608px]">
      <div data-testid="btn" className="cursor-pointer" onClick={() => setDate(undefined)}></div>

      <div className="flex flex-row mt-4">
        <DateRangePicker setDate={setDate} date={date} />
        <Button className="ml-auto">+ Чөлөө хүсэх</Button>
      </div>

      {reversedDays.map((day) => {
        const matchedRequests = requestsData?.getRequestsByEmployee?.filter((request) => request?.selectedDay && isEqual(new Date(request.selectedDay), day));

        if (!matchedRequests || matchedRequests.length === 0) {
          return null;
        }

        return (
          <div key={day.toISOString()} className="mt-4 ">
            {matchedRequests.map((request) => (
              <div key={request?._id} className="mb-4">
                <div className="flex flex-row gap-2">
                  <span className="text-base font-medium">{request?.selectedDay && format(new Date(request.selectedDay), 'yyyy/MM/dd')}</span>
                </div>
                <div className="flex flex-col gap-2 p-6 border rounded-xl w-[684px] ">
                  <div className="flex flex-row gap-2 items-center">
                    <PiTagThin className="w-4 h-4" />
                    <div>{request?.requestStatus && statusMapping[request.requestStatus]}</div>
                    <div className="flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {request?.requestType && typeMapping[request.requestType]}
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <CiCalendar className="w-4 h-4" />
                    <div>{request?.createdAt && format(new Date(request.createdAt), 'yyyy/MM/dd')}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default RequestStory;
