import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { profileFormSchema } from './schema/ProfileFormSchema';
import z from 'zod';

type NameEmailFieldsProps = {
  control: Control<z.infer<typeof profileFormSchema>>;
};

export const NameEmailFields = ({ control }: NameEmailFieldsProps) => {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:gap-6">
      <div className="space-y-2 md:w-1/2">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input id="name" autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="space-y-2 md:w-1/2">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input id="email" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
