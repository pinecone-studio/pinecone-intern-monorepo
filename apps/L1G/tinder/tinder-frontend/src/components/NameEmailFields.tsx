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
    <div className="flex gap-6">
      <div className="space-y-2 w-1/2">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="space-y-2 w-1/2">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
