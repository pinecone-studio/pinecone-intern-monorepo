'use client';
import { useAuth } from '@/app/_components/context/AuthContext';
import { LoginSchema } from '@/app/auth/utils/login-schema';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLoginUserMutation } from '@/generated';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const Login = () => {
  const router = useRouter();
  const { setJWT } = useAuth();
  const [loginUser, { error }] = useLoginUserMutation();
  const form = useForm<z.infer<typeof LoginSchema>>({
    mode: 'onChange',
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      const response = await loginUser({ variables: values });
      if (response.data?.loginUser.JWT) {
        const now = new Date();
        const expiry = now.getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem('token', response.data.loginUser.JWT);
        setJWT(response.data.loginUser.JWT);
        localStorage.setItem('tokenExpiry', expiry.toString());
        router.push('/');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div data-cy="signin-form" className="flex justify-center h-[100vh] items-center w-[100%] ">
      <div>
        <Form {...form}>
          <form className="flex items-center " onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" w-[600px] h-[750px] flex gap-4 flex-col rounded-2xl  items-center">
              <div className="flex justify-center items-center pt-[100px] mb-2 font-semibold ">
                <div className="w-5 h-5 rounded-full bg-[#00B7F4] m-2"></div>
                <div>
                  <h1 className=" text-2xl font-medium text-black ">TICKET BOOKING</h1>
                </div>
              </div>
              <h2 className="text-2xl text-black text-center ">Нэвтрэх</h2>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input aria-label="email-input" className="rounded-md border w-[350px] h-[36px] mt-3 pl-2 shadow" {...field} type="email" placeholder="Имэйл хаяг" />
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
                    <FormControl>
                      <Input aria-label="password-input" className="rounded-md border w-[350px] h-[36px] mt-[-4px] pl-2 shadow" {...field} type="password" placeholder="Нууц үг" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <div className="text-red-500 text-sm">{error.message}</div>}
              <Button disabled={!form.formState.isValid || form.formState.isSubmitting} type="submit" className="w-[350px] h-[36px] mt-1 bg-black">
                {form.formState.isSubmitting ? 'Түр хүлээнэ үү...' : 'Нэвтрэх'}
              </Button>
              <div className="text-black text-center text-base mt-1">Нууц үг мартсан?</div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default Login;
