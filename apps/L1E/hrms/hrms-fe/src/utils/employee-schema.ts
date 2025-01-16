import * as z from 'zod';

export const employeeSchema = z.object({
  username: z.string().min(2, {
    message: 'хамгийн багадаа 2 тэмдэгттэй байх ёстой.',
  }),
  jobTitle: z.string().min(2, {
    message: 'хамгийн багадаа 2 тэмдэгттэй байх ёстой.',
  }),
  email: z.string().email({
    message: 'Хүчинтэй имэйл хаяг оруулна уу.',
  }),
  createdAt: z.date({
    message: 'огноо сонгоно уу.',
  }),
  employeeStatus: z.string({
    message: 'Албан тушаал сонгоно уу.',
  }),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
