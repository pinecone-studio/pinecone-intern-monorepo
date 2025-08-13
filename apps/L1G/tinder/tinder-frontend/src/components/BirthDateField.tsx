import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';

type Props = { control: Control<any> };

export const BirthDateField = ({ control }: Props) => {
  return (
    <FormField
      control={control}
      name="birthDate"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Date of birth</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl className="w-[280px]">
                <Button data-testid="date-picker-button" variant="outline" className={`border w-full pl-3 text-left font-normal ${!field.value ? 'text-muted-foreground' : ''}`}>
                  {field.value ? format(field.value, 'PPP') : <span>{field.value}</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date('1900-01-01')} captionLayout="dropdown" />
            </PopoverContent>
          </Popover>
          <FormDescription>Your date of birth is used to calculate your age.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
