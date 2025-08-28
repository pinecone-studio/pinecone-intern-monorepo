import { z } from 'zod';

export const profileFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(50, { message: 'Name must be less than 50 characters' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  birthDate: z.date({ 
    required_error: 'Date of birth is required',
    invalid_type_error: 'Please enter a valid date'
  }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  genderPreference: z.string().min(1, { message: 'Gender preference is required' }),
  bio: z.string().max(200, { message: 'Bio must be less than 200 characters' }).optional(),
  interests: z.array(z.string()).max(10, { message: 'You can select maximum 10 interests' }).optional(),
  profession: z.string().max(100, { message: 'Profession must be less than 100 characters' }).optional(),
  school: z.string().max(100, { message: 'School must be less than 100 characters' }).optional(),
});