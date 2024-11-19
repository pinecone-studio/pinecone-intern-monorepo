'use client';
import { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@mui/material';
import { format } from 'date-fns';

type AdminSearcherProps = {
  setSearchValue: (value: string) => void; // This type should reflect the function signature.
};

const options = ['Хурд', 'Харанга', 'Davaidasha', 'Болдбаатар', 'Ариунаа'];

export const AdminSearcher = ({ setSearchValue }: AdminSearcherProps) => {
  const today = new Date();
  const [date, setDate] = useState<Date | undefined>(today);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSelectChange = (value: string) => {
    setSelectedValues(prevValues => {
      if (prevValues.includes(value)) {
        return prevValues;
      }
      return [...prevValues, value];
    });
  };

  const handleClearSelection = () => {
    setSelectedValues([]);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    setSearchValue(value); 
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-2 border p-3">
        <div>
          <input
            onChange={handleSearchChange} // Use handleSearchChange to update the search term and parent state
            type="search"
            placeholder="Тасалбар хайх"
            className="pl-3 w-[251px] h-[36px] border rounded bg-[#ffff] text-[1]"
            value={searchTerm}
          />
        </div>

        <div className="flex gap-2">
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px] h-[36px]" data-testid="admin-searcher-select">
              <SelectValue placeholder=" + Уран бүтээлч" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Уран бүтээлч</SelectLabel>
                {options.map(option => (
                  <SelectItem key={option} value={option} data-testid="option">
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            data-testid="selection-input"
            type="text"
            className="pl-3 mr-auto h-[36px] w-fit"
            value={selectedValues.join(' ')}
            readOnly
            required
          />
        </div>
        <div className="flex items-center bg-white border rounded px-5 text-[14px] h-[36px] gap-5">
          <span>Цэвэрлэх</span>
          <button data-testid="clear-btn" type="button" onClick={handleClearSelection}>
            X
          </button>
        </div>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[240px] justify-between text-left font-normal h-[36px]" data-testid="choose-date-id">
            {date && format(date, 'dd MMM yyyy')}
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border shadow" />
        </PopoverContent>
      </Popover>
    </div>
  );
};
