import { Container } from './assets';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export const UserProfile = () => {
  const today = new Date();
  const [date, setDate] = React.useState<Date | undefined>(today);

  return (
    <Container backgroundColor="bg-white w-[672px]">
      <div className="m-auto">
        <div className="container m-auto h-fit px-6 pb-16 ">
          <h3 className="text-lg font-medium text-[#09090B]">Personal Information</h3>
          <p className="text-[#71717A] text-sm font-thin mb-6">This is how others will see you on the site.</p>
          <div className="border border-x-2 mb-6"></div>

          <div className="flex gap-6 w-full">
            <div className="flex w-full flex-col gap-4 mb-5">
              <Label htmlFor="name" className="text-left">
                First Name
              </Label>
              <Input id="First Name" defaultValue="" placeholder="Placeholder" />
            </div>
            <div className="flex w-full flex-col gap-4 mb-7">
              <Label htmlFor="name" className="text-left">
                Last Name
              </Label>
              <Input id="Last Name" defaultValue="" placeholder="Placeholder" />
            </div>
          </div>

          <div className="flex flex-col gap-4 mb-5 ">
            <Label htmlFor="name" className="text-left">
              Date of birth
            </Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant={'outline'} className={`w-[280px] text-left font-normal flex items-center border rounded-md justify-between`}>
                  <span>{format(date as Date, 'PPP')}</span>
                  <CalendarIcon className="w-[16px] h-[16px] " />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
            <p className="text-[#71717A] text-sm font-thin mb-6">Your date of birth is used to calculate your age.</p>
          </div>

          <Button variant="secondary" className="bg-[#2563EB] text-[#FAFAFA] font-medium ">
            Update profile
          </Button>
        </div>
      </div>
    </Container>
  );
};
