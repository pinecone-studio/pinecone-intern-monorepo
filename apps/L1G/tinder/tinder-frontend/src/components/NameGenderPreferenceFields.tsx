import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { profileFormSchema } from './schema/ProfileFormSchema';
import z from 'zod';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


type NameGenderPreferenceFieldsProps = {
  control: Control<z.infer<typeof profileFormSchema>>;
};

export const NameGenderPreferenceFields = ({ control }: NameGenderPreferenceFieldsProps) => {
  return (
    <div className="flex gap-6">
      <div className="space-y-2 w-1/2">
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
      <div className="space-y-2 w-1/2">
        <FormField
          control={control}
          name="genderPreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="genderPreference">Gender Preference</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  onOpenChange={(open) => {
                    if (!open) field.onBlur(); // ✅ simulate blur when dropdown closes
                  }}
                >
                  <SelectTrigger id="genderPreference" className="w-[240px]">
                    <SelectValue placeholder="Select gender preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem data-testid="option-male" value="Male">
                        Male
                      </SelectItem>
                      <SelectItem data-testid="option-female" value="Female">
                        Female
                      </SelectItem>
                      <SelectItem data-testid="option-both" value="Both">
                        Both
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
