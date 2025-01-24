'use client';

import ForgetPasswordPage from '@/components/auth/ForgotPasswordPage';
import { useAuth } from '@/components/providers';
import { z } from 'zod';

const FormSchema = z.object({
  email: z.string().min(8, {
    message: 'Э-мэйл 8-с дээш байх шаардлагатай.',
  }),
});

const Page = () => {
  const { requestChangePassword } = useAuth();
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    await requestChangePassword({
      email: values.email,
    });
  };
  return <ForgetPasswordPage onSubmit={onSubmit} />;
};

export default Page;
