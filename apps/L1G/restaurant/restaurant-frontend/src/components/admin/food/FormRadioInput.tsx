import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { formSchemaFood } from '@/helpers/form-schemas';
import { Control } from 'react-hook-form';
import { z } from 'zod';

type RadioInputProps = {
  control: Control<z.infer<typeof formSchemaFood>>;
};

export const RadioInput = ({ control }: RadioInputProps) => {
  return (
    <FormField
      control={control}
      name="status"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormControl>
            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex justify-center items-center">
              <FormItem>
                <div className="flex justify-center items-center gap-3">
                  <FormControl>
                    <RadioGroupItem data-cy="create-food-activestatus-input" data-testid="create-food-activestatus-input" value="Идэвхитэй" />
                  </FormControl>
                  <FormLabel className="font-normal">Идэвхитэй</FormLabel>
                </div>
              </FormItem>
              <FormItem>
                <div className="flex justify-center items-center gap-3">
                  <FormControl>
                    <RadioGroupItem data-cy="create-food-inactivestatus-input" data-testid="create-food-inactivestatus-input" value="Идэвхигүй" />
                  </FormControl>
                  <FormLabel className="font-normal">Идэвхигүй</FormLabel>
                </div>
              </FormItem>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
