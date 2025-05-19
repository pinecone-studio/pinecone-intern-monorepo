'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRequestPasswordResetMutation } from '@/generated';

const emailSchema = z.object({
  email: z.string().email('Valid email is required'),
});

type Props = {
  setEmail: (_email: string) => void;
  setCurrentStep: (_step: number) => void;
};

export const ForgetPasswordEmail = ({ setEmail, setCurrentStep }: Props) => {
  const [requestReset, { loading }] = useRequestPasswordResetMutation({
    onError: () => {
      form.setError('email', {
        message: 'Failed to send reset email',
      });
    },
  });

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof emailSchema>) => {
    const response = await requestReset({
      variables: { email: data.email },
    });

    if (response.data?.requestPasswordReset.success) {
      setEmail(data.email);
      setCurrentStep(1);
    } else {
      form.setError('email', {
        message: 'Failed to send reset email',
      });
    }
  };

  return (
    <div data-cy="email-page" className="h-screen flex flex-col relative items-center justify-center px-4">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center font-medium">
          <div className="flex items-center gap-2 mb-[24px]">
            <div className="w-5 h-5 rounded-full bg-[#2563eb]"></div>
            <h2 className="text-[#09090b] text-[20px]">Pedia</h2>
          </div>
          <h3 className="text-[24px] leading-8 mb-[4px] font-medium font-inter">Forget password</h3>
          <p className="font-light text-[#71717a]">Enter your email account to reset password</p>
        </div>
      </div>

      <Form {...form}>
        <form data-cy="email-form" onSubmit={form.handleSubmit(onSubmit)} className="w-[350px] max-w-md space-y-4 mt-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel data-cy="email-label" className="text-[14px] font-medium mb-2">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    data-cy="email-input"
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="mt-2 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-visible:ring-0 font-extralight"
                    {...field}
                  />
                </FormControl>
                <FormMessage data-cy="error-message" className="text-sm text-red-500 mt-2 font-thin" />
              </FormItem>
            )}
          />
          <Button data-cy="submit-btn" type="submit" disabled={loading} className="w-full bg-[#2563eb] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
            {loading ? 'Sending...' : 'Continue'}
          </Button>
        </form>
      </Form>

      <div className="absolute bottom-8 text-sm text-[#09090B] font-light">©2024 Pedia is an Pedia Group company.</div>
    </div>
  );
};
