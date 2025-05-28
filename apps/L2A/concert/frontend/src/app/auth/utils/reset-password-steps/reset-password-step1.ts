import z from 'zod';

export const ResetPasswordStep1Schema = z.object({
  email: z.string().email({ message: 'Зөв майл оруулна уу!' }),
});
