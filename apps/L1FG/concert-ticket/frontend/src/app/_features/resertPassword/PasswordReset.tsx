'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { passwordClick } from '@/app/resetPassword/page';
import { useRequestChangePasswordMutation } from '@/generated';
import { useAlert } from '../../../components/providers/AlertProvider';
import React from 'react';

const FormSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

export const ResetPage = ({ handleNext, handleChange }: passwordClick) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });
  const { showAlert } = useAlert();
  const [requestChangePassword] = useRequestChangePasswordMutation({
    onCompleted: () => {
      handleNext();
    },
    onError: (error) => showAlert('error', `${error.message}`),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    requestChangePassword({ variables: { input: { email: data.email } } });
    handleChange({ target: { name: 'email', value: data.email } } as React.ChangeEvent<HTMLInputElement>);
    showAlert('success', 'Таны бүртгэлийг шалгаж байна түр хүлээнэ үү');
  }
  return (
    <div className="flex h-screen justify-center items-center" data-testid="login-form-onSubmit-button">
      <div className="flex flex-col items-center gap-6 px-12 py-8  bg-[#09090B] border border-[#27272A] rounded-xl">
        <p className="text-white   text-[24px] font-thin">Нууц үг сэргээх</p>
        <div className="flex flex-col items-center gap-6">
          <div className="space-y-4">
            <Form {...form}>
              <form data-cy="forget-submit-button" onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#FAFAFA]  font-thin">Имэйл хаяг:</FormLabel>
                      <FormControl>
                        <Input
                          data-cy="forget-email-input"
                          className="w-[350px] h-[36px] bg-black text-white text-[13px] placeholder-[#A1A1AA] pl-3 border border-[#27272A] rounded-sm"
                          placeholder="name@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="w-[350px]" />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row gap-4 w-[350px]">
                  <Button data-cy="forget-button" data-testid="signup-button" className="w-full h-[36px] hover:bg-blue-600 bg-[#00B7F4] text-black text-sm font-light rounded-sm" type="submit">
                    Үргэлжлүүлэх
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
