'use client';
import { MiddleHeader } from '../../_components/MiddleHeader';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useUpdatePersonalInformationMutation } from '@/generated';
import { useEffect } from 'react';

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'Нэр хамгийн багадаа 2 тэмдэгт байна.' }),
  lastName: z.string().min(2, { message: 'Овог хамгийн багадаа 2 тэмдэгт байна.' }),
  birth: z.date({
    required_error: 'Төрсөн огноо заавал шаардлагатай.',
  }),
});

export const PersonalInformation = () => {
  const [updatePersonalInformation, { data, loading, error }] = useUpdatePersonalInformationMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      birth: undefined,
    },
  });

  const userId = '682207ae2c5870fba2e6da4c';

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Submitted data:', values);

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
          birth: values.birth.toISOString(), // эсвэл формат тохируулах
        },
      });

      if (response.data) {
        console.log('Амжилттай шинэчлэгдлээ:', response.data);
      }
    } catch (err) {
      console.error('Алдаа гарлаа:', err);
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
                    <Input className="w-[324px]" placeholder="Bataa" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input className="w-[324px]" placeholder="Dondog" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birth"
              render={({ field }) => (
                <FormItem className="flex flex-col w-[324px]">
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className={`w-full flex justify-between border-[1px] ${!field.value && 'text-muted-foreground'}`}>
                          {field.value ? format(field.value, 'yyyy-MM-dd') : 'Pick a date'}
                          <CalendarIcon className="mr-2 h-4 w-4" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} captionLayout="dropdown" fromYear={1900} toYear={new Date().getFullYear()} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-[324px]" type="submit">
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  );
};
