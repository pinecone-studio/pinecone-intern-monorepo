import { z } from 'zod';
export const SignUpSchema = z
  .object({
    email: z.string().email({ message: 'Зөв имэйл хаяг оруулна уу' }),
    password: z.string().min(6, 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Нууц үг таарахгүй байна',
  });
