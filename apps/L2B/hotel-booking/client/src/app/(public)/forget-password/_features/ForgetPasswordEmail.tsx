'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const emailSchema = z.object({
  email: z.string().email('Valid email is required'),
});

type Props = {
  setEmail: (_email: string) => void;
  setCurrentStep: (_step: number) => void;
};

export const ForgetPasswordEmail = ({ setEmail, setCurrentStep }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = (data: z.infer<typeof emailSchema>) => {
    console.log('Email submitted:', data.email);
    setEmail(data.email);
    setCurrentStep(1);
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
      <form data-cy="email-form" onSubmit={handleSubmit(onSubmit)} className="w-[350px] max-w-md space-y-4 mt-6">
        <div>
          <label data-cy="email-label" htmlFor="email" className="text-[14px] font-medium mb-2">
            Email
          </label>
          <Input
            data-cy="email-input"
            id="email"
            type="email"
            {...register('email')}
            className="mt-2 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-visible:ring-0 font-extralight"
            placeholder="name@example.com"
          />
          {errors.email && (
            <p data-cy="error-message" className="text-sm text-red-500 mt-2 font-thin">
              {errors.email.message}
            </p>
          )}
        </div>
        <Button data-cy="submit-btn" type="submit" disabled={isSubmitting} className="w-full bg-[#2563eb] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
          {isSubmitting ? 'Processing...' : 'Continue'}
        </Button>
      </form>
      <div className="absolute bottom-8 text-sm text-[#09090B] font-light">©2024 Pedia is an Pedia Group company.</div>
    </div>
  );
};
