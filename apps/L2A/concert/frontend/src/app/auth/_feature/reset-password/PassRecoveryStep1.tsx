'use client';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { ResetPasswordStep1Schema } from '../../utils/reset-password-steps/reset-password-step1';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useOtpMutation } from '@/generated';
import LoadingAnimation from '@/app/_components/LoadingAnimation';

export const PassRecoveryStep1 = ({ setStep }: { setStep: Dispatch<SetStateAction<number>> }) => {
  const [OTP, { error, loading }] = useOtpMutation();
  const form = useForm<z.infer<typeof ResetPasswordStep1Schema>>({
    resolver: zodResolver(ResetPasswordStep1Schema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordStep1Schema>) => {
    try {
      const res = await OTP({ variables: values });
      if (res.data) {
        localStorage.setItem('OTP-email', values.email);
        setStep(2);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-black flex justify-center items-center w-[100%] h-[100vh] ">
      <div className="border-[1px] flex flex-col gap-6 border-[#27272A] rounded-2xl p-10">
        <div className="text-2xl font-medium flex justify-center text-white">Нууц үг сэргээх</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" flex flex-col gap-5 p-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Майл</FormLabel>
                    <FormControl>
                      <Input className=" bg-background text-foreground" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <div className=" text-red-400 text-xs justify-center flex">{error.message}</div>}
              <Button disabled={!form.formState.isValid || loading} className="w-full bg-foreground">
                {loading ? <LoadingAnimation /> : 'Үргэлжлүүлэх'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
