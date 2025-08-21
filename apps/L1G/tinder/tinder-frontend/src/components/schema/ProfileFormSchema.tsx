import { z } from 'zod';

export const profileFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email({ message: 'Please enter a valid email' }),
  birthDate: z.date({ message: 'A date of birth is required.' }),
  gender: z.string().min(1),
  genderPreference: z.string().min(1),
  bio: z.string().max(200, { message: 'Bio must be less than 200 characters' }),
  interests: z.array(z.string()).optional(),
  profession: z.string().max(100, { message: 'Profession must be less than 100 characters' }),
  school: z.string().max(100, { message: 'School must be less than 100 characters' }),
});
