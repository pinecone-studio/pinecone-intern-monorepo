'use client';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddUserMutation } from '@/generated';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { SignUpSchema } from '../utils/signup-schema';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
  const [addUser, { error }] = useAddUserMutation();
  const [userRegistered, setUserRegistered] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    try {
      const response = await addUser({ variables: { email: values.email, password: values.password } });
      if (response.data?.addUser) {
        setUserRegistered(true);
        form.reset();
        router.push('/auth/signin');
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div data-cy="signup-form" className="flex justify-center items-center h-[100vh] w-[100%]">
      <div>
        <Form {...form}>
          <form className="flex items-center" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-[446px] h-[480px] border-[1px] flex gap-4 flex-col border-[#27272A] rounded-2xl justify-center items-center">
              <h1 className="text-2xl text-white text-center mt-[40px]">Бүртгүүлэх</h1>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имэйл хаяг:</FormLabel>
                    <FormControl>
                      <Input
                        arial-label="email-input"
                        className="rounded-md
                      border w-[350px] h-[36px] mt-1 pl-2"
                        {...field}
                        type="email"
                        placeholder="example@gmail.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Нууц үг үүсгэх:</FormLabel>
                    <FormControl>
                      <Input
                        aria-label="password-input"
                        className="rounded-md 
                      border w-[350px] h-[36px] mt-1 pl-2"
                        {...field}
                        type="password"
                        placeholder="******"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Нууц үг давтах</FormLabel>
                    <FormControl>
                      <Input
                        aria-label="password-input"
                        className="rounded-md 
                      border w-[350px] h-[36px] mt-1 pl-2"
                        {...field}
                        type="password"
                        placeholder="******"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {userRegistered && <p className="text-green-500 text-center">Бүртгэл амжилттай!</p>}
              {error && <p className="text-red-500 text-center">{error.message}</p>}

              <Button disabled={!form.formState.isValid || form.formState.isSubmitting} type="submit" className="w-[350px] h-[36px] mt-[12px] bg-[#00B7F4]">
                {form.formState.isSubmitting ? 'Илгээж байна...' : 'Бүртгүүлэх'}
              </Button>
              <div className="text-[#A1A1AA] text-center text-sm mt-2 m-[50px]">
                Та бүртгэлтэй хаягтай бол{' '}
                <Link href="/auth/signin" className="cursor-pointer underline">
                  нэвтрэх
                </Link>{' '}
                хэсгээр орно уу!
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
