'use client';
import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, CirclePlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '../../../../../../../../../libs/shadcn/src/lib/utils';
const TicketFilterBar = () => {
  const [filters, setFilters] = useState<string[]>(['Davaidasha', 'Хурд']);
  const [field, setField] = useState<{ value: Date | null }>({ value: null });
  const removeFilter = (filter: string) => {
    setFilters(filters.filter((f) => f !== filter));
  };
  const clearFilters = () => {
    setFilters([]);
  };
  const handleDateChange = () => {
    setField({ value: new Date() });
  };
  return (
    <div className="flex justify-between p-4 rounded-md w-full max-w-[1620px]">
      <div className="flex gap-4">
        <input type="text" placeholder="Тасалбар хайх" className="px-3 py-1 border border-gray-300 rounded-md w-60 text-sm" />
        <div className="flex flex-wrap items-center gap-2 border border-gray-300 px-3 py-0.5 rounded-md bg-white">
          <button className="text-gray-500 hover:text-black flex flex-row">
            <CirclePlus />
            <h1 className="text-black">Уран бүтээлч</h1>
          </button>
          <div className="h-[20px] w-[1px] bg-gray-500"></div>
          {filters.map((filter, index) => (
            <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-[5px] text-sm">
              {filter}
              <button onClick={() => removeFilter(filter)}>
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={clearFilters} className="text-sm px-3 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-100 flex items-center gap-1">
          Цэвэрлэх <X size={14} />
        </button>
      </div>
      <Button
        variant={'outline'}
        className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
        onClick={handleDateChange} // Example: Trigger date change
      >
        {field.value ? format(new Date(field.value), 'PPP') : <span>Өдөр сонгох</span>}
        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
      </Button>
    </div>
  );
};
export default TicketFilterBar;
