'use client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { ResetPasswordStep3Schema } from '../../utils/reset-password-steps/reset-password-step3';
import z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeftCircle } from 'lucide-react';
import { useOtpStep3Mutation } from '@/generated';
import LoadingAnimation from '@/app/_components/LoadingAnimation';

const PassRecoveryStep3 = ({ setStep }: { setStep: Dispatch<SetStateAction<number>> }) => {
  const [OtpStep3] = useOtpStep3Mutation();
  const form = useForm<z.infer<typeof ResetPasswordStep3Schema>>({
    resolver: zodResolver(ResetPasswordStep3Schema),
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordStep3Schema>) => {
    try {
      const email = localStorage.getItem('OTP-email');
      const otp = localStorage.getItem('OTP-otp');
      if (!otp || !email) return;
      const res = await OtpStep3({ variables: { password: values.password, email, otp: Number(otp) } });
      if (res.data) {
        setStep(4);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-black flex h-[100vh] w-[100%] justify-center items-center">
      <div className=" border-[1px] flex justify-center flex-col items-center gap-7  border-[#27272A] rounded-2xl p-16">
        <div data-testid="step-back-to-two" onClick={() => setStep(2)} className=" flex items-center gap-2 cursor-pointer ">
          <ArrowLeftCircle /> <div>Буцах</div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" flex flex-col gap-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Нууц үг</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Нууц үгээ дахин оруулна уу!</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={!form.formState.isValid || form.formState.isSubmitting} className="w-full">
                {form.formState.isSubmitting ? <LoadingAnimation /> : 'Үргэлжлүүлэх'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PassRecoveryStep3;
