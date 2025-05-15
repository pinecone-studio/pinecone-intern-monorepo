'use client';
import { format, differenceInYears } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ControllerRenderProps } from 'react-hook-form';
import { PersonalInformationFormValues } from '../_feature/PersonalInformation';

type DatePickerProps = {
  field: ControllerRenderProps<PersonalInformationFormValues, 'birth'>;
};

export const DatePicker = ({ field }: DatePickerProps) => {
  const age = field.value instanceof Date ? differenceInYears(new Date(), field.value) : null;

  return (
    <FormItem className="flex flex-col w-[324px]">
      <FormLabel>Date of Birth</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button variant="outline" className={`w-full flex justify-between border font-extralight ${!field.value && 'text-muted-foreground'}`}>
              {field.value ? format(field.value, 'yyyy-MM-dd') : 'Pick a date'}
              <CalendarIcon className="ml-2 h-4 w-4" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={field.value ?? undefined} onSelect={field.onChange} captionLayout="dropdown" fromYear={1900} toYear={new Date().getFullYear()} initialFocus />
        </PopoverContent>
      </Popover>
      {age !== null ? (
        <p className="text-sm text-muted-foreground font-extralight">{age} years old</p>
      ) : (
        <p className="text-[14px] font-extralight text-[#71717a]">Your date of birth is used to calculate your age.</p>
      )}
      <FormMessage className="font-extralight" />
    </FormItem>
  );
};
