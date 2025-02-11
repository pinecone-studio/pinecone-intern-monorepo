import * as React from 'react';
import { format } from 'date-fns';

type SelectDayProps = {
  date: string;
  time: string | undefined;
};
const SelectDemo = ({ date, time }: SelectDayProps) => {
  return (
    <div className="flex flex-col gap-2 text-stone-600 p-1">
      <p className="text-base font-light ">Тоглолтын өдөр, цаг</p>
      <div className="flex flex-row gap-2">
        <div className="text-muted-foreground  text-lg font-normal">{date ? format(date, 'yyyy-MM-dd') : ''}</div>
        <div className="text-muted-foreground  text-lg font-normal"> {time}</div>
      </div>
    </div>
  );
};
export default SelectDemo;
