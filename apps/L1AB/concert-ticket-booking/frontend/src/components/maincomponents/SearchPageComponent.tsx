'use client';
import { useGetAllEventsQuery } from '@/generated';
import { EventCard } from './EventCard';
import { LuSearch } from 'react-icons/lu';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, XIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { EventCardSkeleton } from './Skeletons/EventCardSkeleton';

export const SearchPageComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { data, loading } = useGetAllEventsQuery();

  if (loading) {
    return (
      <div>
        <div className="flex gap-2">
          <Skeleton className="w-[233px] h-[42px] bg-gray-900"></Skeleton>
          <Skeleton className="w-[280px] h-[42px] bg-gray-900"></Skeleton>
        </div>
        <EventCardSkeleton />;
      </div>
    );
  }

  const searchedData = data?.getAllEvents.filter((event) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const matchesSearchTerm = event.name.toLowerCase().includes(lowerCaseTerm) || event.artistName[0]?.toLowerCase().includes(lowerCaseTerm);

    const matchesDate = date
      ? event.eventDate.some((eventDate) => {
          const parsedEventDate = parseISO(eventDate);
          return parsedEventDate.toDateString() === date.toDateString();
        })
      : true;

    return matchesSearchTerm && matchesDate;
  });

  return (
    <div className="text-white flex flex-col" data-testid="searchpagecomponent" data-cy="getEvents">
      <div className="flex gap-2 items-center">
        <div className="py-1 px-2 border border-[#FAFAFA] flex justify-center items-center rounded-lg">
          <input
            data-cy="Search-Events"
            className="py-1 px-3 bg-[#09090B] text-[#A1A1AA] outline-none"
            placeholder="Хайлт"
            value={searchTerm}
            data-testid="searchinput"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <LuSearch className="w-6 h-6" />
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button data-testid="calendar-button" data-cy="Search-Date-Events" variant="outline" className="w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>

          {date && (
            <button
              data-cy="Search-Date-Events-Clear"
              data-testid="calendar-clear"
              onClick={() => setDate(undefined)}
              className="p-2 text-[#A1A1AA] hover:text-white bg-transparent border border-[#FAFAFA] rounded-md flex items-center justify-center"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 py-12">
        {searchedData?.length ? searchedData.map((event) => <EventCard key={event._id} {...event} />) : <p className="text-[#A1A1AA] text-2xl col-span-3 text-center">Тохирох үйл явдал олдсонгүй.</p>}
      </div>
    </div>
  );
};
