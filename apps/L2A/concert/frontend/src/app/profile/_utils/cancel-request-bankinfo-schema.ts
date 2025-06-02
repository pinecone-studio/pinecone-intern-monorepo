import z from 'zod';

export const CancelRequestSchema = z.object({
  bankName: z.string().min(4, { message: 'Дор хаяж 4 -н үсэг оруулна уу!' }),
  accountNumber: z.string().min(6, { message: 'Дор хаяж 4 -н үсэг оруулна уу!' }),
  bankOwnerName: z.string().min(3, { message: 'Таны нэр 2 үсэгтэй юм уу?' }),
});
