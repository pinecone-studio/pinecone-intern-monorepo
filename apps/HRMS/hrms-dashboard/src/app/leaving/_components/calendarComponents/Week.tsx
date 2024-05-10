'use client';
import React from 'react';
import { Dayjs } from 'dayjs';
import { TDay } from './DataMatrix';
import { Day } from './Days';

type TWeek = {
  leaveRequestOfDay: TDay[];
  day: Dayjs;
};

type CalendarWeekProps = {
  data: TWeek[][];
};

export const CalendarWeek =({ data }: CalendarWeekProps) => {
  return (
    <div className='mb-[20px]'>
      {data.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7">
          {week.map((dayData, dayIndex) => (
            <div data-testid="weekRequests" key={dayIndex} className="relative w-100 h-[120px] border-[1px] border-[#A9A9A9] overflow-scroll">
              <p className="text-[#717171] absolute bottom-[5px] left-[5px]">{dayData.day.format('DD')}</p>
              <Day data={dayData.leaveRequestOfDay} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}