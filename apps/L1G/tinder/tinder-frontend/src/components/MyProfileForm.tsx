'use client';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { format } from 'date-fns';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email({ message: 'Please enter a valid email' }),
  birthDate: z.date({ message: 'A date of birth is required.' }),
  genderPrefence: z.string().min(1),
  bio: z.string().max(200, { message: 'Bio must be less than 200 characters' }),
  interests: z.string().max(100),
  profession: z.string().max(100, { message: 'Profession must be less than 100 characters' }),
  school: z.string().max(100, { message: 'School must be less than 100 characters' }),
});

export const MyProfileForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      birthDate: new Date('2000-01-01'),
      genderPrefence: '',
      bio: '',
      interests: '',
      profession: '',
      school: '',
    },
  });

  function onSubmit(_values: z.infer<typeof formSchema>) {
    console.log('working');
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col gap-6">
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="flex">Name</FormLabel>
                  <FormControl>
                    <Input className="rounded-md" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="flex justify-between">Email </FormLabel>
                  <FormControl>
                    <Input className="rounded-md" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
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

          <FormField
            control={form.control}
            name="genderPrefence"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex">Gender Preference</FormLabel>
                <FormControl>
                  <Input className="rounded-md" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex">Bio</FormLabel>
                <FormControl>
                  <Input className="rounded-md" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interests"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex">Interests</FormLabel>
                <FormControl>
                  <Input className="rounded-md" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex">Profession</FormLabel>
                <FormControl>
                  <Input className="rounded-md" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex">School/Work</FormLabel>
                <FormControl>
                  <Input className="rounded-md" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="rounded-md w-fit py-2 px-4 bg-[#E11D48E5] bg-opacity-90 font-sans hover:bg-[#E11D48E5] hover:bg-opacity-100">
          Update Profile
        </Button>
      </form>
    </Form>
  );
};
