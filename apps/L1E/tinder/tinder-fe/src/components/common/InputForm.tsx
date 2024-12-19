'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
  Age: z.string().min(1, {
    message: 'Birthday must be at least 1 number.',
  }),
});

const InputForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Age: '',
    },
  });

  // const onSubmit = (data: z.infer<typeof FormSchema>) => {};
  // onSubmit={form.handleSubmit(onSubmit)}

  return (
    <Form {...form}>
      <form className="w-full h-[90px]">
        <FormField
          control={form.control}
          name="Age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of birth</FormLabel>
              <FormControl>
                <Input placeholder="Enter your age" {...field} />
              </FormControl>
              <FormDescription>Your date of birth is used to calculate your age.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default InputForm;
