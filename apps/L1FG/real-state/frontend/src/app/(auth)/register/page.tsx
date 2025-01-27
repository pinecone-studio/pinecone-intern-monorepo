'use client';

import { z } from 'zod';
import { useAuth } from '@/components/providers';
import RegisterPage from '@/components/auth/RegisterPage';

const FormSchema = z
  .object({
    name: z.string().min(8, {
      message: 'Хэрэглэгчийн нэр 8-с дээш байх шаардлагатай.',
    }),
    email: z.string().min(8, { message: 'Э-майл 8-с дээш байх шаардлагатай жүү' }),
    phone: z.string().min(8, { message: 'Утасны дугаар 8 оронтой байх шаардлагатай жүү' }),
    password: z.string().min(8, { message: 'Нууц үг 8-аас дээш байх шаардлагатай жүү' }),
    confirmPassword: z.string().min(8, { message: 'Баталгаажуулах нууц нь 8-аас дээш байх шаардлагатай жүү' }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    { message: 'Баталгаажуулах нууц үг нь нууц үгтэй таарах ёстой жүү', path: ['comfirmPassword'] }
  );

const Page = () => {
  const { signup } = useAuth();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await signup({ name: data.name, email: data.email, password: data.password, phone: data.phone });
  };
  return <RegisterPage onSubmit={onSubmit} />;
};

export default Page;
