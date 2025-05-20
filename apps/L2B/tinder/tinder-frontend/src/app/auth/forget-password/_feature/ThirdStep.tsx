'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { passwordSchema } from '../_components/PasswordSchema';
import { useRouter } from 'next/navigation';
import { useForgotPasswordMutation } from '@/generated';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ThirdStep = ({ email }: { email: string }) => {
  const router = useRouter();
  const [forgotPassword, { loading }] = useForgotPasswordMutation({
    onCompleted: () => {
      toast.success('Password successfully changed!');
      router.push('/auth/sign-in');
    },
  });

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: { password: string }) => {
    const { password } = data;
    await forgotPassword({ variables: { password, email } });
  };

  return (
    <div className="w-full max-w-sm p-6 space-y-6" data-testid="Step3">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-black">Set new password for {email}</h2>
        <p className="text-sm text-gray-500">
          Use a minimum of 10 characters, including <br />
          uppercase letters, lowercase letters, and numbers
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input data-testid="password-input" {...field} type="password" placeholder="Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input data-testid="confirm-password-input" {...field} type="password" placeholder="Confirm Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} data-testid="submit-password" className="w-full py-3 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition">
            {loading ? 'loading...' : 'Continue'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ThirdStep;
