import z from 'zod';
export const LoginSchema = z.object({
  email: z.string().email('Имэйл хаяг буруу байна'),
  password: z.string().min(6, 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой'),
});
