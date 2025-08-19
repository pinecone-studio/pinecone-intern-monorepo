import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchemaFood } from '@/helpers/form-schemas';
import { Control } from 'react-hook-form';
import { z } from 'zod';

type TextInputProps = {
  control: Control<z.infer<typeof formSchemaFood>>;
  placeholder: string;
  fieldName: 'foodName' | 'price' | 'category';
  'data-testid'?: string;
};

export const TextInput = ({ control, placeholder, fieldName, 'data-testid': dataTestId }: TextInputProps) => {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input data-testid={dataTestId} placeholder={placeholder} type="text" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
