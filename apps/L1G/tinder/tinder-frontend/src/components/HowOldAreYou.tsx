'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { TinderLogo } from './TinderLogo';

const HowOldAreYou = () => {
  const formSchema = z.object({
    date: z
      .date({
        message: 'A date of birth is required.',
      })
      .nullable(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: null,
    },
  });

  function onSubmit(_values: z.infer<typeof formSchema>) {
    console.log('working');
  }

  return (
    <div className="flex flex-col items-center pt-20 min-h-screen bg-background px-4 gap-6">
      <div className="w-full max-w-[400px] flex flex-col items-center gap-6">
        <TinderLogo />
        <div className="flex justify-center items-center flex-col">
          <h1 className="font-inter font-semibold tracking-wider text-2xl leading-8 text-foreground">How old are you</h1>
          <p className="inter text-sm font-normal leading-5 text-muted-foreground">Please enter your age to continue</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button data-testid="date-picker-button" variant="outline" className={`border w-full pl-3 text-left font-normal ${!field.value ? 'text-muted-foreground' : ''}`}>
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ?? undefined}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Your date of birth is used to calculate your age.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button className="bg-white text-black border border-gray-200 rounded-full px-4" type="button">
              Back
            </Button>
            <Button data-testid="next-button" className="bg-red-600 rounded-full px-4" type="submit">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default HowOldAreYou;
