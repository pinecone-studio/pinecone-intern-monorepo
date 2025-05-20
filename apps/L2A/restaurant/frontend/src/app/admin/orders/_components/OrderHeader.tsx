'use client';

import { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Route } from 'lucide-react';

const STATUSES = [
  { label: 'Бэлэн', value: 'ready' },
  { label: 'Хүлээгдэж буй', value: 'pending' },
  { label: 'Хийгдэж буй', value: 'inprogress' },
  { label: 'Дууссан', value: 'done' },
];

const OrderHeader = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [status, setStatus] = useState<string | null>(null);

  return (
    <div className="flex items-center justify-between w-[600px] mt-7" data-cy="order-header">
      <p className="font-semibold text-3xl text-gray-800" data-cy="order-title">
        Захиалга
      </p>
      <div className="flex gap-2 ">
        <Popover>
          <PopoverTrigger asChild>
            <button data-testid="date-picker-trigger" className="flex items-center gap-2 px-4 py-2 border rounded-md">
              <CalendarIcon className="w-4 h-4" />
              <span>{date && date.toLocaleDateString().split('T')[0]}</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar defaultMonth={new Date()} mode="single" selected={date} onSelect={setDate} initialFocus data-testid="date-picker-calendar" />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <button data-testid="status-picker-trigger" className="flex items-center gap-2 px-4 py-2 border rounded-md max-w-[180px] justify-between">
              <div className="flex items-center gap-2">
                <Route className="w-4 h-4" />
                <span>{status ?? 'Төлөв'}</span>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-2 bg-white shadow-lg rounded-md w-[180px]">
            <ul>
              {STATUSES.map((item) => (
                <li
                  key={item.value}
                  onClick={() => setStatus(item.label)}
                  data-testid={`status-option-${item.value}`}
                  className={`cursor-pointer px-3 py-2 rounded-md hover:bg-gray-100 ${status === item.label ? 'bg-gray-100 font-medium' : ''}`}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default OrderHeader;
