import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown, Minus, Plus, User } from 'lucide-react';
import React from 'react';
import useCounter from './UseCounter';

const GuestOptions = () => {
  const [isGuestOpen, setIsGuestOpen] = React.useState(false);
  const { count: adults, increment: incrementAdults, decrement: decrementAdults } = useCounter(1);
  const { count: rooms, increment: incrementRooms, decrement: decrementRooms } = useCounter(1);

  const guestInfo = `${adults} ${adults === 1 ? 'traveller' : 'travellers'}, ${rooms} ${rooms === 1 ? 'room' : 'rooms'}`;

  return (
    <div data-cy="guest-options">
      <Popover open={isGuestOpen} onOpenChange={setIsGuestOpen}>
        <PopoverTrigger asChild className="border-[1px]" data-cy="guest-options-trigger">
          <Button variant="outline" className="w-full justify-between text-left font-normal h-[40px]" data-cy="guest-options-trigger">
            <div className="flex items-center justify-between">
              <User className="mr-2 h-4 w-4" />
              <h1 className="flex justify-between text-sm font-normal" data-cy="guest-options-info">
                {guestInfo}
              </h1>
            </div>
            <ChevronDown />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-80" align="end" data-cy="guest-options-content">
          <div className="space-y-4 p-2">
            <h3 className="font-medium text-lg">Travels</h3>

            {/* Adults */}
            <div className="flex items-center justify-between">
              <h1 className="text-sm font-normal">Adult</h1>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={decrementAdults} data-cy="decrement-adults">
                  <Minus className="h-3 w-3" />
                </Button>
                <h1 className="w-4 text-center" data-cy="adult-count">
                  {adults}
                </h1>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={incrementAdults} data-cy="increment-adults">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Rooms */}
            <div className="flex items-center justify-between">
              <h1 className="text-sm font-normal">Rooms</h1>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={decrementRooms} data-cy="decrement-rooms">
                  <Minus className="h-3 w-3" />
                </Button>
                <h1 className="w-4 text-center" data-cy="room-count">
                  {rooms}
                </h1>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={incrementRooms} data-cy="increment-rooms">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="w-24 bg-blue-600" onClick={() => setIsGuestOpen(false)} data-cy="guest-options-done">
                Done
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default GuestOptions;
