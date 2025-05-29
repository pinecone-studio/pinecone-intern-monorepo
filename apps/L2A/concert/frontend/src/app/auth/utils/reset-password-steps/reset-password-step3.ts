import z from 'zod';

export const ResetPasswordStep3Schema = z
  .object({
    password: z.string().min(6, { message: 'Дор хаяж 6 оронтой байх ёстой!' }),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Нууц үг таарахгүй байна!',
  });
