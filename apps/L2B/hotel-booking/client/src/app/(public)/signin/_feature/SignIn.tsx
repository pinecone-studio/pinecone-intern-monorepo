'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/generated';
import { useState } from 'react';

const formSchema = z.object({
  email: z.string().email({
    message: 'Email is required.',
  }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .refine((password) => /[a-z]/.test(password), {
      message: 'Password must include at least one lowercase letter.',
    })
    .refine((password) => /[0-9]/.test(password), {
      message: 'Password must include at least one number.',
    }),
});

const SignIn = () => {
  const [login, { loading }] = useLoginMutation();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setServerError(null);
      const response = await login({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
      if (response.data?.login.token) {
        localStorage.setItem('authToken', response.data.login.token);
        router.push('/');
      } else {
        setServerError('Invalid credentials');
      }
    } catch (err) {
      setServerError('Error in login');
    }
  }

  return (
    <div className="flex flex-col items-center gap-6" data-cy="Sign-In-Page">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 mb-[24px]">
          <div className="w-5 h-5 rounded-full bg-[#2563eb]"></div>
          <h2 className="text-[#09090b] text-[20px]">Pedia</h2>
        </div>
        <h3 className="text-[24px] leading-8 mb-[4px] font-medium font-inter">Sign in</h3>
        <p className="font-light text-[#71717a]">Enter your email below to sign in</p>
      </div>

      <div className="w-[350px] flex flex-col items-center gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col items-center gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" type="email" className="w-full" data-cy="email-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex justify-between items-center">
                    <h4>Password</h4>
                    <Link href="/forget-password" className="text-[#2563EB] hover:underline font-[500] leading-[20px]">
                      Forget password?
                    </Link>
                  </FormLabel>
                  <FormControl className="w-full">
                    <Input placeholder="••••••••" type="password" className="w-full" data-cy="password-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {serverError && (
              <p data-cy="error-message" className="text-sm text-red-500 text-center">
                {serverError}
              </p>
            )}
            <Button type="submit" className="bg-[#2563EB] hover:bg-[#2d60cc] w-full" data-cy="submit-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Continue'}
            </Button>
          </form>
        </Form>
        <div className="flex justify-center items-center w-full">
          <div className="w-full border"></div>
          <h4 className="p-[10px] text-muted-foreground">OR</h4>
          <div className="w-full border"></div>
        </div>
        <Button variant="outline" className="w-full border shadow-current text-[14px] font-[500] leading-[20px]" onClick={() => router.push('/signup')}>
          Create an account
        </Button>
      </div>
      <div className="text-center text-sm text-muted-foreground">
        <p>
          By clicking continue, you agree to our <br />
          <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      <div className="text-center text-sm text-muted-foreground pt-8 absolute bottom-[32px]">©2025 Pedia is an Pedia Group company.</div>
    </div>
  );
};

export default SignIn;
