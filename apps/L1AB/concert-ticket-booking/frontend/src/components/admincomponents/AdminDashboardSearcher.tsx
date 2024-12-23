'use client';
import { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, XIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useGetAllEventsQuery } from '@/generated';

interface AdminSearcherProps {
  setSearchValue: (_value: string) => void;
  setSelectedValues: (_values: string[] | ((_prevValues: string[]) => string[])) => void;
  selectedValues: string[];
  date: Date | undefined;
  setDate: (_date: Date | undefined) => void;
}

export const AdminSearcher = ({ setSearchValue, setSelectedValues, selectedValues, date, setDate }: AdminSearcherProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchArtist, setSearchArtist] = useState<string>('');
  const { data } = useGetAllEventsQuery();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    {
      setSearchTerm(value);
      setSearchValue(value);
    }
  };

  const handleSelectChange = (value: string) => {
    setSelectedValues([value]);
    setSearchArtist(value);
  };

  const handleClearSelection = () => {
    setSelectedValues([]);
    setSearchArtist('');
  };

  const handleClearDate = () => {
    setDate(undefined);
  };

  return (
    <div data-testid="searchpagecomponent" className="flex justify-between">
      <div className="flex gap-2 border p-3">
        <div>
          <input
            onChange={(e) => handleInputChange(e)}
            data-testid="searchinput"
            type="search"
            placeholder="Тасалбар хайх"
            className="pl-3 w-[251px] h-[36px] border rounded bg-[#ffff] text-[1]  dark:text-black"
            value={searchTerm}
          />
        </div>

        <div className="flex gap-2">
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px] h-[36px] text-black" data-testid="admin-searcher-select">
              <SelectValue placeholder=" + Уран бүтээлч " className="text-black" />
            </SelectTrigger>
            <SelectContent className="dark:text-black dark:bg-white">
              <SelectGroup className="dark:bg-white">
                <SelectLabel className="text-black placeholder:text-black ">Уран бүтээлч</SelectLabel>
                {data?.getAllEvents.map((item, index) => (
                  <SelectItem key={index} value={item.artistName[0]} data-testid="option" className="text-black ">
                    {item.artistName[0]}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div data-testid="button-input" className={`w-fit justify-center items-center flex gap-5 rounded ${selectedValues?.length > 0 ? 'bg-secondary px-3 font[8px]' : ''}`}>
            {selectedValues.join(' , ') || searchArtist}
          </div>
        </div>
        <div className="flex items-center bg-white border rounded px-5 text-[14px] h-[36px] gap-5">
          <span className="text-black">Цэвэрлэх</span>
          <button data-testid="clear-btn" type="button" onClick={handleClearSelection}>
            <XIcon className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] text-black justify-between text-left border-black border font-normal h-[36px]" data-testid="choose-date-id">
              {date ? format(date, 'dd MMM yyyy') : 'Сонгох огноо'}
              <CalendarIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border shadow text-black dark:bg-white" />
          </PopoverContent>
        </Popover>
        {date && <XIcon className="w-5 h-5 border rounded cursor-pointer mx-2 " onClick={handleClearDate} data-testid="clear-date" />}
      </div>
    </div>
  );
};
