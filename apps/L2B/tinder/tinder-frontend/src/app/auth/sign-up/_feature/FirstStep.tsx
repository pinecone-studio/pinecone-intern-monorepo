import React from 'react';
import { StepOneProps } from '../_feature/SignUpSteps';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useSendOtpMutation } from '@/generated';

const formSchema = z.object({
  email: z.string().email(),
});

const FirstStep = ({ setStep, setEmail }: StepOneProps) => {
  const [sendOtp, { loading }] = useSendOtpMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await sendOtp({ variables: { email: values.email } });
    setEmail(values.email);
    setStep(2);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col w-[350px] gap-[24px]">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="text-center">
              <FormLabel className="text-[24px] w-[204px] h-[32px]">Create an account</FormLabel>
              <p className="text-[14px] text-[#71717A]">Enter your email below to your account</p>
              <h1 className="flex justify-start text-[14px]">Email</h1>
              <FormControl>
                <Input placeholder="name@example.com" {...field} className="w-[350px] h-[36px] rounded-lg" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" data-testid="submit" className="w-[350px] h-[36px] bg-[#E11D48] hover:bg-red-700" disabled={loading}>
          {loading ? 'Sending...' : 'Continue'}
        </Button>

        <div className="flex items-center gap-5">
          <div className="w-full border"></div>
          <p className="text-center text-gray-400 text-sm">OR</p>
          <div className="w-full border"></div>
        </div>

        <Button className="w-[350px] h-[36px] text-black rounded-2xl bg-white border-[#E4E4E7] border">Log in</Button>

        <p className="text-[14px] text-[#71717A] text-center">By clicking continue, you agree to our Terms of Service and Privacy Policy.</p>
      </form>
    </Form>
  );
};

export default FirstStep;
