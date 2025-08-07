'use client';
import z from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  repeatPassword: z.string().min(8, {
    message: 'Confirm password must be at least 8 characters.',
  }),
});

export const CreatePassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  });

  function onSubmit(_values: z.infer<typeof formSchema>) {
    console.log('working');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[360px] flex flex-col">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="flex flex-col gap-1 justify-center items-center py-2">
            <p className="font-sans text-[24px] font-semibold text-[#09090B]">Create password</p>
            <p className="font-sans text-[14px] text-[#71717A] text-center">
              Use a minimum of 10 characters, including uppercase <br /> letters, lowercase letters, and numbers
            </p>
          </div>

          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="flex flex-col gap-4 justify-center items-center">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans text-[14px] text-[#09090B] ">Password</FormLabel>
                    <FormControl>
                      <Input type="password" className="p-2 rounded-md w-[360px]" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage className="text-s text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans text-[14px] text-[#09090B] ">Confirm password</FormLabel>
                    <FormControl>
                      <Input type="password" className="p-2 rounded-md w-[360px]" placeholder="Confirm password" {...field} />
                    </FormControl>
                    <FormMessage className="text-s text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="bg-[#E11D48] bg-opacity-90 w-[350px] rounded-full">
              Continue
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
