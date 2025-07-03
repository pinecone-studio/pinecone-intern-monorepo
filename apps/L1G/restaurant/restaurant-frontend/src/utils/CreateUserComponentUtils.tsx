
import { z } from 'zod';

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    email: z.string().email({ message: 'Please enter a valid email' }),
    password: z.string().min(8, { message: 'Please enter at least 8 letters' }),
    confirmPassword: z.string().min(8, {
      message: 'Please enter at least 8 letters',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password did not match',
    path: ['confirmPassword'],
  });

export { formSchema };


