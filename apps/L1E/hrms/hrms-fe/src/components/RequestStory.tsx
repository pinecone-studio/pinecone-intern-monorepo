'use client';
import { PiTagThin } from 'react-icons/pi';
import { CiCalendar } from 'react-icons/ci';
import { Button } from '@/components/ui/button';
import { useGetRequestsByEmployeeQuery } from '@/generated';
import { addDays, eachDayOfInterval, format } from 'date-fns';
import { DateRangePicker } from './DateRangePicker';
import { DateRange } from 'react-day-picker';
import { useState } from 'react';

const RequestStory = () => {
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
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -3),
    to: new Date(),
  });
  const daysArray = eachDayOfInterval({
    start: date?.from || new Date(),
    end: date?.to || new Date(),
  });

  const { data } = useGetRequestsByEmployeeQuery({ variables: { employeeId: '676e6e4007d5ae05a35cda9e' } });

  return (
    <div className="flex flex-col gap-[7px]">
      <div
        data-testid="btn"
        onClick={() => {
          setDate(undefined);
        }}
      ></div>
      <div className="flex flex-row mt-4">
        <DateRangePicker setDate={setDate} date={date} />
        <Button className="flex ml-[262px]">+ Чөлөө хүсэх</Button>
      </div>
      {daysArray.reverse().map((e, index) => {
        const matchedRequest = data?.getRequestsByEmployee?.filter((el) => {
          return e.toString() == el?.selectedDay;
        });
        if (matchedRequest) {
          return (
            <div key={index}>
              {matchedRequest.map((el, index) => {
                return (
                  <div key={index}>
                    <div className="flex flex-row gap-2 mt-4">
                      <span className="text-base font-medium">{el?.selectedDay && format(el?.selectedDay, 'yyyy/MM/dd')}</span>
                      <span className="text-[#09090B] text-base font-normal"></span>
                    </div>
                    <div className="flex flex-col gap-2 text-xs font-normal w-[684px] h-[96px] p-6 border  rounded-xl ">
                      <div className="flex flex-row gap-2">
                        <PiTagThin className="w-4 h-4 " />
                        <div>{el?.requestStatus && statusMapping[el.requestStatus]}</div>
                        <div className="w-[122px] flex justify-center h-5 text-xs font-medium rounded-full bg-[#F9731633] pt-[2px] pb-[2px] pl-[10px] pr-[10px] ">
                          {el?.requestType && typeMapping[el.requestType]}
                        </div>
                      </div>
                      <div className="flex flex-row gap-2">
                        <CiCalendar className="w-4 h-4 " />
                        <div>{el?.createdAt && format(el?.createdAt, 'yyyy/MM/dd')}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }
      })}
    </div>
  );
};
export default RequestStory;
