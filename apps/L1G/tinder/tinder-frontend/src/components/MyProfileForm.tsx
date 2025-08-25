'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from './MultiSelect';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { profileFormSchema } from './schema/ProfileFormSchema';
import { NameEmailFields } from './NameEmailFields';
import { BirthDateField } from './BirthDateField';
import { Separator } from '@/components/ui/separator';
import { ProfessionSchoolFields } from './ProfessionSchoolFields';
import { useGetAllInterestsQuery } from '@/generated';
import { zodResolver } from '@hookform/resolvers/zod';

export const MyProfileForm = () => {
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      birthDate: new Date('2000-01-01'),
      genderPreference: 'Female',
      bio: 'my bio',
      interests: [],
      profession: 'Software Engineer',
      school: 'Facebook',
    },
  });

  const { data } = useGetAllInterestsQuery();
  const interestOptions =
    data?.getAllInterests.map((i) => ({
      value: i._id,
      label: i.interestName,
    })) || [];

  const onSubmit = async (_data: z.infer<typeof profileFormSchema>) => {
    console.log(_data);
  };

  return (
    <div className="flex flex-col w-full max-w-[672px]">
      <div className="flex flex-col gap-[1px] justify-start items-start ">
        <p className="text-[18px] font-sans font-[500] text-[#09090B]">Personal Information</p>
        <p className="text-[14px] font-sans font-[400] text-[#71717A]">This is how others will see you on the site.</p>
      </div>

      <div className="py-6">
        <Separator />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <NameEmailFields control={form.control} />
            <BirthDateField control={form.control} />
            <FormField
              control={form.control}
              name="genderPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel id="genderPreference-label" className="flex" htmlFor="genderPreference">
                    Gender Preference
                  </FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger id="genderPreference" className="w-[180px]" aria-labelledby="genderPreference-label">
                        <SelectValue placeholder="" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectItem data-testid="option-male" value="Male">
                            Male
                          </SelectItem>
                          <SelectItem data-testid="option-female" value="Female">
                            Female
                          </SelectItem>
                          <SelectItem data-testid="option-both" value="Both">
                            Both
                          </SelectItem>
                        </SelectGroup>
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
                    <MultiSelect data-testid="multi-select-trigger" onValueChange={(val) => field.onChange(val)} options={interestOptions} value={field.value ?? []} maxCount={10} />
                  </FormControl>
                  <FormDescription>You can select up to a maximum of 10 interests.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ProfessionSchoolFields control={form.control} />
            <Button type="submit" className="rounded-md w-fit py-2 px-4 bg-[#E11D48E5] bg-opacity-90 font-sans hover:bg-[#E11D48E5] hover:bg-opacity-100">
              Update Profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
