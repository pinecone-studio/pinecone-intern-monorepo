'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IoMdTime } from 'react-icons/io';
import { PiTagThin } from 'react-icons/pi';
import { useGetAllRequestsQuery } from '@/generated';
import { DateRangePicker } from '@/components/DateRangePicker';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { addDays, format, eachDayOfInterval } from 'date-fns';
import { LoadingSpinner } from '@/components/LoadingSpinner';

type ComponentName = 'MyRequest' | '/request-form' | 'LeaveCalendar' | 'PendingRequest' | 'EmployeeList' | 'Leave';

const Page = () => {
  const { data } = useGetAllRequestsQuery({ variables: { limit: 100 } });
  const router = useRouter();

  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -3),
    to: new Date(),
  });

  if (!data) {
    return (
      <div className="w-screen h-screen  bg-neutral-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

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
    router.push(componentName);
    setDate(date);
  };

  return (
    <div data-cy="leave-calendar-page" className="w-full h-screen flex justify-center pt-[200px] bg-neutral-100 ">
      <div className="flex flex-col gap-2 ">
        <div className="text-xl font-semibold">Чөлөө авсан:</div>
        <div className="flex flex-row w-[608px] gap-[186px]">
          <DateRangePicker setDate={setDate} date={date} />
          <Button
            data-cy="request-button"
            data-testid="btn"
            onClick={() => {
              handleClick(undefined, '/request-form');
            }}
          >
            + Чөлөө хүсэх
          </Button>
        </div>

        {daysArray.reverse().map((element, index) => {
          const matchedRequest = data?.getAllRequests?.filter((el) => {
            const selectedDate = el?.selectedDay as string;
            return format(element, 'MM/dd/yy') === format(new Date(selectedDate), 'MM/dd/yy');
          });
          return (
            matchedRequest &&
            matchedRequest?.length > 0 && (
              <div key={index} data-cy={`data-${index}`} className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2 mt-4">
                    <span className="text-base font-medium">{format(element, 'MM/dd')}</span>
                    {new Date().toDateString() === element.toDateString() && <span className="text-muted-foreground text-sm font-normal mt-[3px]">Өнөөдөр</span>}
                  </div>
                  {matchedRequest?.map((el, idx) => (
                    <div key={idx} data-cy={`matched-data-${idx}`} className="flex flex-row gap-4 w-[608px] h-[96px] font-normal text-sm pt-5 pl-6 pb-5 rounded-xl border">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-2">
                        <div>{el?.employeeId?.username}</div>
                        <div className="flex flex-row gap-4">
                          <IoMdTime className="w-5 h-5" />
                          <div>
                            {el?.startTime} - {el?.endTime}
                          </div>
                          <PiTagThin />
                          <div>{el?.requestStatus && statusMapping[el.requestStatus]}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Page;
