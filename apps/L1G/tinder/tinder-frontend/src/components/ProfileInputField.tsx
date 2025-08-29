'use client';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type Props = {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  testId?: string;
};

export const ProfileInputField = ({ control, name, label, placeholder, testId }: Props) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="w-full px-1">
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input data-testid={testId} placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
