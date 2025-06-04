import z from 'zod';
export const EditEventInfoSchema = z.object({
  description: z.string().min(15, { message: 'Дор хаяж 15 үсэг оруулах шаадлагатай!' }),
  title: z.string().min(4, { message: 'Нэр заавал 3-аас дээш байх шаардлагатай!' }),
  artistName: z.string().min(2, { message: 'Дор хаяж 2 үсэг оруулах шаадлагатай!' }),
});
