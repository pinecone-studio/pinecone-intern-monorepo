'use client';

import { z } from 'zod';
import { useAuth } from '@/components/providers';
import RegisterPage from '@/components/auth/RegisterPage';

const FormSchema = z
  .object({
    name: z.string().min(8, {
      message: 'Username must be at least 8 characters.',
    }),
    email: z.string().min(4, { message: 'email must be at least 2 characters' }),
    phone: z.string().min(8, { message: 'phone must be at 8 characters' }),
    password: z.string().min(8, { message: 'password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'password must be save' }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    { message: ' should be match', path: ['comfirmPassword'] }
  );

const Page = () => {
  const { signup } = useAuth();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await signup({ name: data.name, email: data.email, password: data.password, phone: data.phone });
  };
  return <RegisterPage onSubmit={onSubmit} />;
};

export default Page;
