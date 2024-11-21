'use client';
import { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, XIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@mui/material';
import { format } from 'date-fns';
import { useGetAllEventsQuery } from '@/generated';

interface AdminSearcherProps {
  setSearchValue: (_value: string) => void;
  setSelectedValues: (_values: string[] | ((_prevValues: string[]) => string[])) => void;
  selectedValues: string[]; 
  date: Date | undefined 
  setDate: (_date: Date | undefined) => void;
}

export const AdminSearcher = ({ setSearchValue, setSelectedValues, selectedValues ,date ,setDate}: AdminSearcherProps) => {
 
 
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchArtist, setSearchArtist] = useState<string>('');
  const { data } = useGetAllEventsQuery();
 
 

  const handleSelectChange = (value:string ) => {
    setSelectedValues((prevValues) => {
      if (prevValues.includes(value)) {
        return prevValues;
      }
      return [...prevValues, value];
    });
    setSearchArtist(value);
  };

  const handleClearSelection = () => {
    setSelectedValues([]);
    setSearchArtist('');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    setSearchValue(value);
  };
  const handleArtist = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchArtist(value); 
  };
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 border p-3">
        <div>
          <input onChange={handleSearchChange} type="search" placeholder="Тасалбар хайх" className="pl-3 w-[251px] h-[36px] border rounded bg-[#ffff] text-[1]" value={searchTerm} />
        </div>

        <div className="flex gap-2">
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px] h-[36px]" data-testid="admin-searcher-select">
              <SelectValue placeholder=" + Уран бүтээлч" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Уран бүтээлч</SelectLabel>
                {data?.getAllEvents.map((item, index) => (
                  <SelectItem key={index} value={item.artistName[0]} data-testid="option">
                    {item.artistName[0]}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            type="submit"
            onChange={handleArtist}
            data-testid="selection-input"
            className={` w-fit flex gap-5 ${selectedValues?.length > 0 ? 'bg-secondary px-3 font[8px] ' : ''}`}
            value={selectedValues.join('  ,  ') || searchArtist}
          />
        </div>
        <div className="flex items-center bg-white border rounded px-5 text-[14px] h-[36px] gap-5">
          <span>Цэвэрлэх</span>
          <button data-testid="clear-btn" type="button" onClick={handleClearSelection}>
            <XIcon className='w-5 h-5'/>
          </button>
        </div>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[240px] justify-between text-left font-normal h-[36px]" data-testid="choose-date-id">
            {date && format(date, 'dd MMM yyyy')}
            <CalendarIcon  />
            <span className="ml-2"></span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border shadow" />
        </PopoverContent>
      </Popover>
      {date &&(
        <button
       data-testid="clear-date-btn"
        onClick={() => setDate(undefined)}
        className="flex gap-1 items-center text-gray-600 text-[14px] h-[36px] px-2 rounded-md"
        ><XIcon className='w-5 h-5 border rounded'/></button>

      )}
    </div>
  );
};
