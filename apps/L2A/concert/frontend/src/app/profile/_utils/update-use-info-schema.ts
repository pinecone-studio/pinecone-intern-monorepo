import z from 'zod';

export const UpdateUserInfoSchema = z.object({
  phone: z.string().min(8, { message: 'Утасны дугаар 8 -н оронтой байх ёстой!' }).max(10, { message: 'Утасны дугаар ихдээ 10 -н оронтой байх ёстой' }).optional(),
  email: z.string().email({ message: 'Зөв майл оруулна уу!' }),
});
