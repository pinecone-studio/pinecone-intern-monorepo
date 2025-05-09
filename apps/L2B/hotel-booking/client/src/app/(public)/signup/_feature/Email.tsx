'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpHeader } from '../_components/SignUpHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Dispatch } from 'react';

const signupSchema = z.object({
  email: z.string().email('Valid email is required'),
});

type Props = {
  setEmail: Dispatch<string>;
  currentStep: number;
  setCurrentStep: Dispatch<number>;
};

export const Email = ({ setEmail, currentStep, setCurrentStep }: Props) => {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '' },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = (data: z.infer<typeof signupSchema>) => {
    setEmail(data.email);
    setCurrentStep(currentStep + 1);
  };

  return (
    <div data-cy="Sign-Up-Page" className="h-screen flex flex-col items-center justify-center px-4">
      <SignUpHeader h3="Create an account" p="Enter your email below to create your account" />
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-[350px] max-w-md space-y-4 mt-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium mb-2">
              Email
            </label>
            <Input
              data-cy="Sign-Up-Email-Input"
              id="email"
              type="email"
              {...register('email')}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-visible:ring-0"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p data-cy="Sign-Up-Email-Input-Error-Message" className="text-sm text-red-500 mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button data-cy="Sign-Up-Submit-Button" type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
            {isSubmitting ? 'Submitting...' : 'Continue'}
          </Button>
        </form>
      </FormProvider>
      <div className="flex items-center gap-4 my-6">
        <span className="text-[#71717a] text-[12px]">OR</span>
      </div>
      <Link href="/signin">
        <Button variant={'secondary'} className="w-[350px]">
          Log in
        </Button>
      </Link>
      <p className="w-[350px] text-center font-light text-[#71717a] text-[14px] mt-6">By clicking continue, you agree to our Terms of Service and Privacy Policy.</p>
    </div>
  );
};
