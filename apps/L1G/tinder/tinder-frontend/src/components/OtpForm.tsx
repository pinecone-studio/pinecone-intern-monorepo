import React from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ApolloError } from '@apollo/client';
import z from 'zod';
import { UseFormReturn, ControllerRenderProps } from 'react-hook-form';
import { FormSchema } from './ConfirmEmail';
import { ResendButton } from './ResendButton';

type OTPFormProps = {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
  onSubmit: (_values: z.infer<typeof FormSchema>) => Promise<void>;
  timeLeft: number;
  handleResend: () => Promise<void>;
  resending: boolean;
  resendError: ApolloError | undefined;
  message: string | null;
  verifying: boolean;
  verifyError: ApolloError | undefined;
};

const OTPInputSlots = () => (
  <InputOTPGroup className="h-[40px]" data-testid="otp-group">
    <InputOTPSlot index={0} className="h-full rounded-l-md" />
    <InputOTPSlot index={1} className="h-full" />
    <InputOTPSlot index={2} className="h-full" />
    <InputOTPSlot index={3} className="h-full rounded-r-md" />
  </InputOTPGroup>
);

const OTPFieldRender = ({ field }: { field: ControllerRenderProps<z.infer<typeof FormSchema>, 'otp'> }) => (
  <FormItem className="flex flex-col w-full items-center justify-center">
    <FormLabel></FormLabel>
    <FormControl>
      <InputOTP maxLength={4} {...field} className="w-full">
        <OTPInputSlots />
      </InputOTP>
    </FormControl>
    <FormMessage />
  </FormItem>
);

const OTPInputField = ({ form }: { form: OTPFormProps['form'] }) => <FormField data-testid="otp" control={form.control} name="otp" render={({ field }) => <OTPFieldRender field={field} />} />;

export const OtpForm = ({ form, onSubmit, timeLeft, handleResend, resending, resendError, message, verifying, verifyError }: OTPFormProps) => {
  return (
    <Form {...form}>
      <form data-testid="otp-form" onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col justify-center items-center gap-4">
        <OTPInputField form={form} />

        <ResendButton timeLeft={timeLeft} onResend={handleResend} resending={resending} resendError={resendError} message={message} />

        <Button type="submit" className="w-full bg-[#E11D48E5] bg-opacity-90 text-white hover:bg-[#E11D48E5] rounded-full" disabled={verifying}>
          {verifying ? 'Verifying...' : 'Confirm'}
        </Button>

        {verifyError && <p className="text-red-500 mt-2">{verifyError.message}</p>}
      </form>
    </Form>
  );
};
