import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { formSchemaFood } from '@/helpers/form-schemas';
import { Control } from 'react-hook-form';
import { z } from 'zod';

type RadioInputProps = {
  control: Control<z.infer<typeof formSchemaFood>>;
};

const statusOptions = [
  { id: 'active', label: 'Идэвхитэй', value: 'Идэвхитэй' },
  {
    id: 'inactive',
    label: 'Идэвхигүй',
    value: 'Идэвхигүй',
  },
];

export const RadioInput = ({ control }: RadioInputProps) => {
  return (
    <FormField
      control={control}
      name="status"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormControl>
            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex justify-center items-center">
              {statusOptions.map((option, i) => (
                <FormItem key={i}>
                  <div className="flex justify-center items-center gap-3">
                    <FormControl>
                      <RadioGroupItem data-testid={`food-status-${option.id}`} value={option.value} checked={option.value === field.value} />
                    </FormControl>
                    <FormLabel data-testid="food-status-label" className="font-normal">
                      {option.label}
                    </FormLabel>
                  </div>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
