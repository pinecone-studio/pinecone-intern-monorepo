'use client';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoginSchema } from '../utils/login-schema';
import { useLoginUserMutation } from '@/generated';
import Link from 'next/link';
import { useAuth } from '@/app/_components/context/AuthContext';

const LoginForm = () => {
  const { setJWT } = useAuth();
  const [loginUser] = useLoginUserMutation();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
    try {
      const response = await loginUser({ variables: values });
      if (response.data?.loginUser.JWT) {
        const now = new Date();
        const expiry = now.getTime() + 24 * 60 * 60 * 1000;

        localStorage.setItem('token', response.data.loginUser.JWT);
        setJWT(response.data.loginUser.JWT);
        localStorage.setItem('tokenExpiry', expiry.toString());
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  return (
    <div data-cy="signin-form" className="flex justify-center h-[100vh] items-center w-[100%]">
      <div>
        <Form {...form}>
          <form className="flex items-center " onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" w-[446px] h-[450px] border-[1px] flex gap-4 flex-col border-[#27272A] rounded-2xl justify-center items-center">
              <h1 className="text-2xl text-white text-center mt-[-40px]">Нэвтрэх</h1>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имэйл хаяг:</FormLabel>
                    <FormControl>
                      <Input aria-label="email-input" className="rounded-md border w-[350px] h-[36px] mt-1 pl-2" {...field} type="email" placeholder="example@gmail.com" />
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
                    <FormLabel>Нууц үг:</FormLabel>
                    <FormControl>
                      <Input aria-label="password-input" className="rounded-md border w-[350px] h-[36px] mt-1 pl-2" {...field} type="password" placeholder="*******" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={!form.formState.isValid || form.formState.isSubmitting} type="submit" className="w-[350px] h-[36px] mt-[12px] bg-[#00B7F4]">
                {form.formState.isSubmitting ? 'Түр хүлээнэ үү...' : 'Нэвтрэх'}
              </Button>
              <div className="text-[#A1A1AA] text-center text-sm mt-6">
                Та бүртгэлтэй хаягтай бол{' '}
                <Link href={`/auth/signin`} className="cursor-pointer underline">
                  бүртгүүлэх
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

export default LoginForm;
