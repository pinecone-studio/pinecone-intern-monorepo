'use client';
import { MiddleHeader } from '../../_components/MiddleHeader';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { differenceInYears, format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useGetUserQuery, useUpdatePersonalInformationMutation } from '@/generated';
import { toast } from 'sonner';
import { useEffect } from 'react';

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  birth: z.date().nullable().optional(),
});

export const PersonalInformation = () => {
  const [updatePersonalInformation] = useUpdatePersonalInformationMutation();
  const { data } = useGetUserQuery({
    variables: {
      id: '682207ae2c5870fba2e6da4c',
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      birth: undefined,
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue('firstName', data.getUser.firstName ?? '');
      form.setValue('lastName', data.getUser.lastName ?? '');
      form.setValue('birth', data.getUser.birth ? new Date(data.getUser.birth) : new Date());
    }
  }, [data, form]);

  const userId = '682207ae2c5870fba2e6da4c';

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!userId) {
      console.error('User ID not found');
      return;
    }

    try {
      const response = await updatePersonalInformation({
        variables: {
          id: userId,
          firstName: values.firstName,
          lastName: values.lastName,
          birth: values.birth ? values.birth.toISOString() : null,
        },
      });

      if (response.data) {
        toast.success('Successfully updated!');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error occurred:', err.message);
        toast.error('An error occurred while updating the information.');
      } else {
        console.error('An unknown error occurred');
        toast.error('An unknown error occurred.');
      }
    }
  }

  return (
    <div>
      <MiddleHeader h3="Personal Information" p="This is how others will see you on the site." />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-[100%] flex flex-wrap gap-6 mb-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input className="w-[324px] font-extralight focus-visible:ring-0" placeholder="Placeholder" {...field} />
                  </FormControl>
                  <FormMessage className="font-extralight" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input className="w-[324px] font-extralight focus-visible:ring-0" placeholder="Placeholder" {...field} />
                  </FormControl>
                  <FormMessage className="font-extralight" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birth"
              render={({ field }) => {
                const age = field.value instanceof Date ? differenceInYears(new Date(), field.value) : null;
                return (
                  <FormItem className="flex flex-col w-[324px]">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className={`w-full flex justify-between border-[1px] font-extralight ${!field.value && 'text-muted-foreground'}`}>
                            {field.value ? format(field.value, 'yyyy-MM-dd') : 'Pick a date'}
                            <CalendarIcon className="mr-2 h-4 w-4" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? field.value : undefined}
                          onSelect={field.onChange}
                          captionLayout="dropdown"
                          fromYear={1900}
                          toYear={new Date().getFullYear()}
                          initialFocus
                        />
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
              }}
            />
          </div>
          <Button className="w-[128px] bg-[#2563eb]" type="submit">
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  );
};
