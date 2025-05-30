'use client';

import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { cn } from '../../../../../../../../../libs/shadcn/src/lib/utils';

interface Props {
  control: any;
}

export const ProfileDobField = ({ control }: Props) => (
  <FormField
    control={control}
    name="dob"
    render={({ field }) => (
      <FormItem className="flex flex-col">
        <FormLabel>Date of Birth</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button data-testid="profile-calendar" variant="outline" className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date('1900-01-01')} initialFocus />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    )}
  />
);
