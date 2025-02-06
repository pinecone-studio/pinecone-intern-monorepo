'use client';
import LoginPage from '@/components/auth/LoginPage';
import { useAuth } from '@/components/providers';
import { z } from 'zod';

const FormSchema = z.object({
  email: z.string().min(8, {
    message: 'Э-мэйл 8-с дээш байх шаардлагатай.',
  }),
  password: z.string().min(8, {
    message: 'Нууц үг 8-аас дээш байх шаардлагатай ',
  }),
});

const Page = () => {
  const { signin } = useAuth();

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    await signin({
      email: values.email,
      password: values.password,
    });
  };

  return <LoginPage onSubmit={onSubmit} />;
};

export default Page;
