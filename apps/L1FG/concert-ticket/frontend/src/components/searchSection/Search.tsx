import { Input } from '@/components/ui/input';
import * as React from 'react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/utils';
import { SelectSingleEventHandler } from 'react-day-picker';
import { CalendarSearch } from 'lucide-react';
type SearchProps = {
  onSelect: SelectSingleEventHandler;
  selected: Date | undefined;
  onChange: (_e: string) => void;
};
export const SearchConcert = ({ selected, onSelect, onChange }: SearchProps) => {
  return (
    <div className="flex flex-row gap-4">
      <Input
        data-testid="search-input"
        placeholder="Хайлт"
        data-cy="page-search-input"
        className="w-[263px] bg-zinc-900 border-neutral-600 text-white text-sm"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <Popover data-testid="">
        <PopoverTrigger data-testid="" asChild>
          <Button
            data-cy="page-open-table-btn"
            data-testid="add-calendar-open-table-btn"
            variant={'outline'}
            className={cn('w-[250px] border border-neutral-600 justify-start text-left font-normal bg-zinc-900 text-white')}
          >
            {selected ? (
              format(selected, 'P')
            ) : (
              <div className="flex flex-row gap-3">
                {' '}
                <CalendarSearch className="w-5 h-5" />
                <span className="font-extralight"> Өдөр сонгох</span>
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent data-testid="" className="w-auto p-0" align="start">
          <Calendar data-testid="select-date-modal" data-cy="selected-date" mode="single" selected={selected} onSelect={onSelect} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  );
};
