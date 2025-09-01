import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchemaDiscount } from '@/helpers/form-schemas';
import { Control } from 'react-hook-form';
import { z } from 'zod';

type FormInputProps = {
  control: Control<z.infer<typeof formSchemaDiscount>>;
  placeholder: string;
  type: string;
  fieldName: 'discountName' | 'discountRate';
  'data-testid'?: string;
  'data-cy'?: string;
  disabled: boolean;
};

export const FormFieldInput = ({ control, placeholder, fieldName, type, 'data-testid': dataTestId, 'data-cy': dataCy, disabled }: FormInputProps) => {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input disabled={disabled} data-cy={dataCy} data-testid={dataTestId} placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormMessage data-cy={`category-${fieldName}-error-message`} />
        </FormItem>
      )}
    />
  );
};
