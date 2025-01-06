'use client';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IoMdTime } from 'react-icons/io';
import { PiTagThin } from 'react-icons/pi';
import { GrEmoji } from 'react-icons/gr';
import { useGetAllRequestsQuery } from '@/generated';
import { DateRangePicker } from './DateRangePicker';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { addDays, format, eachDayOfInterval } from 'date-fns';
/* eslint-enable no-unused-vars */
type ComponentName = 'MyRequest' | 'RequestForm' | 'LeaveCalendar' | 'PendingRequest' | 'EmployeeList' | 'Leave';
interface LeaveCalendarProps {
  handlechange: (_componentName: ComponentName) => void;
}
/* eslint-enable no-unused-vars */
export const LeaveCalendar = ({ handlechange }: LeaveCalendarProps) => {
  const { data } = useGetAllRequestsQuery({ variables: { limit: 100 } });

  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -3),
    to: new Date(),
  });

  const daysArray = eachDayOfInterval({
    start: date?.from || new Date(),
    end: date?.to || new Date(),
  });
  const statusMapping: Record<string, string> = {
    FREE: 'Чөлөө',
    PAID_LEAVE: 'Цалинтай чөлөө',
    REMOTE: 'Зайнаас ажиллах',
  };
  const handleClick = (date: undefined, componentName: ComponentName) => {
    handlechange(componentName);
    setDate(date);
  };
  return (
    <div className="flex flex-col ml-[756px] mt-[48px] gap-2 ">
      <div className="text-xl font-semibold">Чөлөө авсан:</div>
      <div className="flex flex-row w-[608px] gap-[186px]">
        <DateRangePicker setDate={setDate} date={date} />

        <Button
          data-testid="btn"
          onClick={() => {
            handleClick(undefined, 'RequestForm');
          }}
        >
          + Чөлөө хүсэх
        </Button>
        <div></div>
      </div>
      {daysArray.reverse().map((element, index) => {
        const matchedRequest = data?.getAllRequests?.filter((el) => {
          return element.toString() == el?.selectedDay;
        });
        return (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 ">
              <div className="flex flex-row gap-2 mt-4">
                <span className="text-base font-medium">{format(element, 'MM/dd')}</span>
                {new Date().toDateString() === element.toDateString() && <span className="text-muted-foreground text-sm font-normal mt-[3px]">Өнөөдөр</span>}
              </div>
              {/* <div className="w-[608px] h-[84px] flex flex-col gap-2 border rounded-xl justify-center items-center">Чөлөөний хүсэлт байхгүй байна.</div> */}
              {matchedRequest?.length !== 0 ? (
                matchedRequest?.map((el, index) => {
                  return (
                    <div key={index} className="flex flex-row gap-4 w-[608px] h-[96px] font-normal text-sm pt-5 pl-6 pb-5 rounded-xl border">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-2">
                        <div> M.Khulan</div>
                        <div className="flex flex-row gap-4">
                          <IoMdTime className="w-5 h-5" />

                          <div>
                            {el?.startTime}-{el?.endTime}
                          </div>
                          <PiTagThin />
                          <div>{el?.requestStatus && statusMapping[el.requestStatus]}</div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="w-[608px] h-[84px] flex flex-col gap-2 border rounded-xl justify-center items-center">
                  <div>Энэ өдөр чөлөө авсан хүн байхгүй байна.</div>
                  <GrEmoji />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
