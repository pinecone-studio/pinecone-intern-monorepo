import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { profileFormSchema } from './schema/ProfileFormSchema';
import z from 'zod';

type ProfessionSchoolFieldsProps = {
  control: Control<z.infer<typeof profileFormSchema>>;
};

export const ProfessionSchoolFields = ({ control }: ProfessionSchoolFieldsProps) => {
  return (
    <>
      <FormField
        control={control}
        name="profession"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex">Profession</FormLabel>
            <FormControl>
              <Input className="rounded-md" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="school"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex">School/Work</FormLabel>
            <FormControl>
              <Input className="rounded-md" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
