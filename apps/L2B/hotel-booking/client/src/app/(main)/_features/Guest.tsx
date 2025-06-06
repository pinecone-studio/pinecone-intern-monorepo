import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown, Minus, Plus, User } from 'lucide-react';
import React from 'react';
import useCounter from '../_components/UseCounter';

const GuestOptions = ({ onGuestChange }: { onGuestChange: (_adults: number, _kids: number) => void }) => {
  const [isGuestOpen, setIsGuestOpen] = React.useState(false);
  const { count: adults, increment: incrementAdults, decrement: decrementAdults } = useCounter(1);
  const { count: kids, increment: incrementKids, decrement: decrementKids } = useCounter(0);

  React.useEffect(() => {
    onGuestChange(adults, kids);
  }, [adults, kids, onGuestChange]);

  const totalGuests = adults + kids;
  const guestInfo = `${totalGuests} ${totalGuests === 1 ? 'traveller' : 'travellers'}`;

  return (
    <div data-cy="guest-options" data-testid="guest-options">
      <Popover open={isGuestOpen} onOpenChange={setIsGuestOpen}>
        <PopoverTrigger asChild className="border-[1px]" data-testid="guest-options-trigger" data-cy="guest-options-trigger">
          <Button variant="outline" className="w-full justify-between text-left font-normal h-[40px]" data-testid="guest-options-trigger" data-cy="guest-options-trigger">
            <div className="flex items-center justify-between">
              <User className="mr-2 h-4 w-4" />
              <h1 className="flex justify-between text-sm font-normal" data-testid="guest-options-info" data-cy="guest-options-info">
                {guestInfo}
              </h1>
            </div>
            <ChevronDown />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-80" align="end" data-testid="guest-options-content" data-cy="guest-options-content">
          <div className="space-y-4 p-2">
            <h3 className="font-medium text-lg">Travels</h3>

            <div className="flex items-center justify-between">
              <h1 className="text-sm font-normal">Adult</h1>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={decrementAdults} data-testid="decrement-adults" data-cy="decrement-adults">
                  <Minus className="h-3 w-3" />
                </Button>
                <h1 className="w-4 text-center" data-cy="adult-count">
                  {adults}
                </h1>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={incrementAdults} data-testid="increment-adults" data-cy="increment-adults">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h1 className="text-sm font-normal">Kids</h1>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={decrementKids} data-testid="decrement-kids" data-cy="decrement-kids">
                  <Minus className="h-3 w-3" />
                </Button>
                <h1 className="w-4 text-center" data-cy="kid-count">
                  {kids}
                </h1>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={incrementKids} data-testid="increment-kids" data-cy="increment-kids">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="w-24 bg-blue-600" onClick={() => setIsGuestOpen(false)} data-testid="guest-options-done" data-cy="guest-options-done">
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
