'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAddUserMutation } from '@/generated';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SignUpHeader } from '../_components/SignUpHeader';
import { useRouter } from 'next/navigation';

const passwordSchema = z
  .object({
    password: z.string().min(8, { message: 'Password is required.' }),
    confirmPassword: z.string().min(8, { message: 'Confirm Password is required.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

type Props = {
  email: string;
};

export const SignUpPassword = ({ email }: Props) => {
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const [addUser] = useAddUserMutation();
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof passwordSchema>) => {
    await addUser({ variables: { email, password: data.password } });
    router.push('/signin');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 max-w-[350px] m-auto">
      <SignUpHeader h3="Create password" p="Use a minimum of 10 characters, including uppercase letters, lowercase letters, and numbers" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-normal">Password</FormLabel>
                <FormControl>
                  <Input data-cy="Sign-Up-Password-Input" type="password" placeholder="••••••••" {...field} className="w-[350px] focus-visible:ring-0 font-extralight" />
                </FormControl>
                <FormMessage data-cy="Sign-Up-Password-Input-Error-Message" className="font-extralight" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-normal">Confirm Password</FormLabel>
                <FormControl>
                  <Input data-cy="Sign-Up-ConfirmPassword-Input" type="password" placeholder="••••••••" {...field} className="focus-visible:ring-0 font-extralight" />
                </FormControl>
                <FormMessage data-cy="Sign-Up-ConfirmPassword-Input-Error-Message" className="font-extralight" />
              </FormItem>
            )}
          />
          <Button data-cy="Sign-Up-Password-Submit-Button" type="submit" className="w-full bg-[#2563eb]">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};
