'use client';
import { useState, useRef, SetStateAction } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, CirclePlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '../../../../../../../../../libs/shadcn/src/lib/utils';

type TicketFilterBarProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<SetStateAction<string>>;
};

const TicketFilterBar = ({ searchTerm, setSearchTerm }: TicketFilterBarProps) => {
  const [filters, setFilters] = useState<string[]>(['Davaidasha', 'Хурд']);
  const [field, setField] = useState<{ value: Date | null }>({ value: null });
  const inputRef = useRef<HTMLInputElement>(null);

  const removeFilter = (filter: string) => {
    setFilters((prev) => prev.filter((f) => f !== filter));
  };

  const clearFilters = () => {
    setFilters([]);
  };

  const handleButtonClick = () => {
    inputRef.current?.showPicker?.();
    inputRef.current?.click();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.valueAsDate;
    setField({ value: selectedDate });
  };

  return (
    <div className="flex justify-between pt-4 pb-4 rounded-md w-3/4" data-testid="ticket-filter-bar">
      <div className="flex gap-4" data-testid="filter-left-section">
        <input
          data-testid="search-input"
          type="text"
          placeholder="Нэрээр хайх"
          className="text-sm px-3 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-100 hidden xl:flex items-center gap-1"
          aria-label="Хайлт хийх"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              // ('ym bh heregtei bn');
            }
          }}
        />
        <div className="hidden xl:flex flex-wrap items-center gap-2 border border-gray-300 px-3 py-0.5 rounded-md bg-white" data-testid="filter-tags-container">
          <button className="text-gray-500 hover:text-black flex items-center gap-1" data-testid="add-artist-button">
            <CirclePlus />
            <span className="text-black">Уран бүтээлч</span>
          </button>
          {filters.map((filter, index) => (
            <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-[5px] text-sm" data-testid={`filter-badge-${index}`}>
              {filter}
              <button onClick={() => removeFilter(filter)} data-testid={`remove-filter-button-${index}`} aria-label={`remove-filter-${filter}`}>
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={clearFilters} className="text-sm px-3 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-100 hidden xl:flex items-center gap-1" data-testid="clear-filters-button">
          Цэвэрлэх <X size={14} />
        </button>
      </div>
      <div className="relative border border-gray-300 rounded-md" data-testid="date-picker-container">
        <Button variant="outline" className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')} onClick={handleButtonClick} data-testid="calendar-button">
          {field.value ? format(field.value, 'PPP') : <span>Өдөр сонгох</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
        <input ref={inputRef} type="date" onChange={handleDateChange} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" data-testid="hidden-date-input" />
      </div>
    </div>
  );
};

export default TicketFilterBar;
