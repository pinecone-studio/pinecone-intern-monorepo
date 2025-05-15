'use client';
import { MiddleHeader } from '../../_components/MiddleHeader';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useGetUserQuery, useUpdatePersonalInformationMutation } from '@/generated';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { DatePicker } from '../_components/DatePicker';

const personalInfoSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  birth: z.date().nullable().optional(),
});

export type PersonalInformationFormValues = z.infer<typeof personalInfoSchema>;

export const PersonalInformation = () => {
  const [updatePersonalInformation] = useUpdatePersonalInformationMutation();
  const { data } = useGetUserQuery({
    variables: {
      id: '682207ae2c5870fba2e6da4c', //nevtersen hereglegchiin _id baih ystoi
    },
  });

  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
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

  const userId = '682207ae2c5870fba2e6da4c'; //nevtersen hereglegchiin _id baih ystoi

  async function onSubmit(values: z.infer<typeof personalInfoSchema>) {
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
    <div data-cy="Personal-Information-Page">
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
                    <Input data-cy="Personal-First-Name-Input" className="w-[324px] font-extralight focus-visible:ring-0" placeholder="Placeholder" {...field} />
                  </FormControl>
                  <FormMessage data-cy="Personal-First-Name-Input-Error-Message" className="font-extralight" />
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
                    <Input data-cy="email-inputs" className="w-[324px] font-extralight focus-visible:ring-0" placeholder="Placeholder" {...field} />
                  </FormControl>
                  <FormMessage className="font-extralight" />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="birth" render={({ field }) => <DatePicker field={field} />} />
          </div>
          <Button data-cy="Personal-Update-Button" className="w-[128px] bg-[#2563eb]" type="submit">
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  );
};
