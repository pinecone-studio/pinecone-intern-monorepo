'use client';
import Image from 'next/image';
import * as z from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import TinderLogo from './TinderLogo';

const formSchema = z.object({
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  repeatPassword: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

const inputs = [
  {
    name: 'password',
    label: 'Password',
  },
  {
    name: 'repeatPassword',
    label: 'Confirm password',
  },
] as const;


export const CreatePassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
   
     <form onSubmit={form.handleSubmit(onSubmit)} className="w-[360px] flex flex-col gap-5">
        <div className="flex flex-col gap-4 justify-center items-center">
          <TinderLogo/>
          <p className='text-[24px] font-md'>Create password</p>
          <p className='text-[14px] text-[#71717A]'>Use a minimum of 10 characters, including  uppercase <br/> letters, lowercase letters, and numbers</p>
          {inputs.map((input) => (
            <FormField
              key={input.label}
              control={form.control}
              name={input.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">{input.label}</FormLabel>
                  <FormControl>
                    <Input className="p-2 rounded-sm w-[360px]" placeholder={input.label} {...field} />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          ))}

        <Button type="submit" className="bg-[#E11D48] w-[350px] rounded-full">
          Continue
          </Button>
          </div>
      </form>
    </Form>
  );
};
