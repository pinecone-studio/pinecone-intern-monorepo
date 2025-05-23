'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSignInMutation } from '@/generated';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

const SignInPage = () => {
  const router = useRouter();
  const [signInMutation, { loading }] = useSignInMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await signInMutation({ variables: values });
      const token = data?.signIn;

      if (token) {
        localStorage.setItem('token', token);
        toast.success('Login successful');
        router.push('/');
      } else {
        toast.error('No token returned. Please try again.');
      }
    } catch (error) {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[400px] flex flex-col items-center gap-8 px-4">
          <div className="flex flex-col items-center gap-1">
            <Image src="/tinder.svg" alt="Tinder Logo" width={1000} height={1000} className="h-[70px] w-[100px]" />
            <h2 className="text-2xl font-semibold">Sign in</h2>
            <p className="text-sm text-gray-500">Enter your email below to sign in</p>
          </div>

          <div className="w-full space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="example@email.com." {...field} />
                  </FormControl>
                  <FormMessage data-testid="email-error" role="alert" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link href="/auth/forget-password" className="text-sm text-blue-500 hover:underline">
                      Forget password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage data-testid="password-error" role="alert" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-[#fe3c72] hover:bg-[#e5355e] text-white rounded-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>

            <div className="flex items-center justify-center gap-2 my-4">
              <div className="h-[1px] bg-gray-200 flex-1"></div>
              <span className="text-sm text-gray-400">OR</span>
              <div className="h-[1px] bg-gray-200 flex-1"></div>
            </div>

            <Link href="/auth/sign-up">
              <Button variant="outline" className="w-full border border-gray-300 rounded-full hover:bg-gray-50">
                Create an account
              </Button>
            </Link>

            <div className="text-center text-xs text-gray-500 mt-6">
              <p>
                By clicking continue, you agree to our
                <Link href="/" className="underline">
                  Terms of Service
                </Link>
                and
                <Link href="/privacy" className="underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </form>
      </Form>
      <div className="text-xs text-gray-400 mt-8">©2024 Tinder</div>
    </div>
  );
};

export default SignInPage;
