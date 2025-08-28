import { z } from 'zod';

export const phoneSchema = z.object({
  phone: z.string().min(8, { message: 'Утасны дугаар шаардлагтай.' }),
});

export const emailSchema = z.object({
  email: z.string().email({ message: 'Имэйл хаяг буруу байна.' }).min(1),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Одоогийн нууц үгээ оруулна уу' }),
    newPassword: z.string().min(6, { message: 'Шинэ нууц үг 6+ тэмдэгттэй байх ёстой.' }),
    confirmPassword: z.string().min(1, { message: 'Нууц үгээ дахин оруулна уу' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Нууц үг таарахгүй байна.',
    path: ['confirmPassword'],
  });

// Full form schema for the main form
export const formSchema = z
  .object({
    phone: z.string().min(8, { message: 'Утасны дугаар шаардлагтай' }),
    email: z.string().email({ message: 'Имэйл хаяг буруу байна.' }).min(1),
    oldPassword: z.string().min(1, { message: 'Одоогийн нууц үгээ оруулна уу' }),
    newPassword: z.string().min(6, { message: 'Шинэ нууц үг 6+ тэмдэгттэй байх ёстой.' }),
    confirmPassword: z.string().min(1, { message: 'Нууц үгээ дахин оруулна уу' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Нууц үг таарахгүй байна.',
    path: ['confirmPassword'],
  });

export const defaultValues = {
  phone: '',
  email: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export type UserFormValues = z.infer<typeof formSchema>;
export type PhoneFormValues = z.infer<typeof phoneSchema>;
export type EmailFormValues = z.infer<typeof emailSchema>;
export type PasswordFormValues = z.infer<typeof passwordSchema>;
