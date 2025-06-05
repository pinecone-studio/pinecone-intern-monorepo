'use client';
import React from 'react';

import { Button } from '@/components/ui/button';
import CalendarDate from './CalendarDate';
import GuestOptions from '../_features/Guest';
import { DateRange } from 'react-day-picker';

const SearchFilter = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
  };
  return (
    <div className="max-w-[1120px] flex justify-between h-[94px] rounded-2xl w-full border-orange-300 border-2 m-auto mt-[-45px] z-10 bg-white ">
      <div className="max-w-[500px] h-[62px] w-full p-3 flex flex-col gap-2">
        <div className="text-sm  font-medium ">Dates</div>
        <CalendarDate date={date} handleDateChange={handleDateChange} />
      </div>
      <div className="max-w-[500px] h-[62px] w-full flex flex-col gap-2 p-3">
        <h2 className="font-medium text-sm ">Guest</h2>
        <GuestOptions />
      </div>
      <Button className="max-w-[95px] w-full h-[40px] bg-blue-600 m-auto mt-10 hover:bg-blue-600">Search</Button>
    </div>
  );
};

export default SearchFilter;
