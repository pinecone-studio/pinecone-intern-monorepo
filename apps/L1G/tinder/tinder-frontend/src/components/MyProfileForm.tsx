'use client';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from './MultiSelect';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { profileFormSchema } from './schema/ProfileFormSchema';
import { NameEmailFields } from './NameEmailFields';
import { BirthDateField } from './BirthDateField';
import { Separator } from '@/components/ui/separator';

export const MyProfileForm = () => {
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: '',
      email: '',
      birthDate: new Date('2000-01-01'),
      genderPrefence: '',
      bio: '',
      interests: [],
      profession: '',
      school: '',
    },
  });

  function onSubmit(_values: z.infer<typeof profileFormSchema>) {
    console.log('working');
  }
  return (
    <div className="flex flex-col w-[672px] max-w-[672px]">
      <div className="flex flex-col gap-[1px] justify-start items-start ">
        <p className="text-[18px] font-sans font-[500] text-[#09090B]">Personal Information</p>
        <p className="text-[14px] font-sans font-[400] text-[#71717A]">This is how others will see you on the site.</p>
      </div>

      <div className="py-6">
        <Separator />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="flex flex-col gap-6">
            <NameEmailFields control={form.control} />
            <BirthDateField control={form.control} />

            <FormField
              control={form.control}
              name="genderPrefence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">Gender Preference</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Men">Men</SelectItem>
                        <SelectItem value="Women">Women</SelectItem>
                        <SelectItem value="Both">Both</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <MultiSelect
                      options={[
                        { value: 'music', label: 'Music' },
                        { value: 'sports', label: 'Sports' },
                        { value: 'reading', label: 'Reading' },
                        { value: 'coding', label: 'Coding' },
                        { value: 'travel', label: 'Travel' },
                        { value: 'gaming', label: 'Gaming' },
                        { value: 'cooking', label: 'Cooking' },
                        { value: 'art', label: 'Art' },
                        { value: 'photography', label: 'Photography' },
                        { value: 'fitness', label: 'Fitness' },
                      ]}
                      value={field.value}
                      maxCount={10}
                    />
                  </FormControl>
                  <FormDescription>You can select up to a maximum of 10 interests.</FormDescription>
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
    </div>
  );
};
