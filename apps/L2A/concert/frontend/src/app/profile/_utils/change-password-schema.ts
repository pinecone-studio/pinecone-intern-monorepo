import z from 'zod';

export const ChangePasswordSchema = z
  .object({
    current: z.string().min(6, { message: 'Нууц үг дор хаяж 6 -н оронтой!' }),
    newPassword: z.string().min(6, { message: 'Шинэ нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Нууц үг таарахгүй байна!',
  });
