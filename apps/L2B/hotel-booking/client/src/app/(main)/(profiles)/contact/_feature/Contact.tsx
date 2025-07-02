'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { MiddleHeader } from '../../_components/MiddleHeader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import * as React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetUserQuery, useUpdateContactMutation } from '@/generated';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { SelectCountryCode } from '../_components/SelectCountryCode';

const formSchema = z.object({
  phone: z.string().min(8, {
    message: 'Phone number must be at least 8 digits.',
  }),
  email: z.string().email({
    message: 'Email is required.',
  }),
  emergencyPhone: z.string().min(8, {
    message: 'Emergency phone must be at least 8 digits.',
  }),
  relation: z.string().nonempty({ message: 'Relation is required.' }),
});

export const Contact = () => {
  const serachParams = useSearchParams();
  const userId = serachParams.get('userId');
  const { data } = useGetUserQuery({
    skip: !userId,
    variables: {
      id: userId ?? '',
    },
  });
  const [updateContact] = useUpdateContactMutation({
    onCompleted: () => {
      toast.success('Successfully updated!');
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
      email: '',
      emergencyPhone: '',
      relation: '',
    },
  });
  React.useEffect(() => {
    form.setValue('phone', data?.getUser.phone ?? '');
    form.setValue('email', data?.getUser.email ?? '');
    form.setValue('emergencyPhone', data?.getUser.emergencyPhone ?? '');
    form.setValue('relation', data?.getUser.relation ?? '');
  }, [data, form]);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!userId) {
      return;
    }
    await updateContact({
      variables: {
        id: userId,
        input: { phone: values.phone, email: values.email, emergencyPhone: values.emergencyPhone, relation: values.relation },
      },
    });
  };
  return (
    <div data-cy="Contact-Page">
      <MiddleHeader h3="Contact info" p="Receive account activity alerts and trip updates by sharing this information" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <div className="w-[324px] flex justify-between">
                      <SelectCountryCode />
                      <Input data-cy="Contact-Phone-Input" className="w-[228px] focus-visible:ring-0" placeholder="Placeholder" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage data-cy="Contact-Phone-Input-Error-Message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email adress</FormLabel>
                  <FormControl>
                    <Input data-cy="Contact-Email-Input" className="w-[324px] focus-visible:ring-0" placeholder="Placeholder" {...field} />
                  </FormControl>
                  <FormMessage data-cy="Contact-Email-Input-Error-Message" />
                </FormItem>
              )}
            />
          </div>
          <MiddleHeader h3="Emergency Contact" p="In case of emergencies, having someone we can reach out to is essential." />
          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="emergencyPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <div className="w-[324px] flex justify-between">
                      <SelectCountryCode />
                      <Input data-cy="Contact-Emergency-Input" className="w-[228px] focus-visible:ring-0" placeholder="Placeholder" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage data-cy="Contact-Emergency-Input-Error-Message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="relation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relationship</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger data-cy="Contact-Relation-Select" className="w-[324px] focus-visible:ring-transparent">
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem data-cy="SelectItem-Parent" value="parent">
                            Parent
                          </SelectItem>
                          <SelectItem data-cy="SelectItem-Sibling" value="sibling">
                            Sibling
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage data-cy="Contact-Relation-Select-Error-Message" />
                </FormItem>
              )}
            />
          </div>
          <Button data-cy="Contact-Update-Button" className="bg-[#2563eb]" type="submit">
            Update profile
          </Button>
        </form>
      </Form>
    </div>
  );
};
