'use client';

import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

interface Props {
  control: any;
}

export const ProfileProfessionField = ({ control }: Props) => (
  <FormField
    control={control}
    name="profession"
    render={({ field }) => (
      <FormItem className="w-full">
        <FormLabel>Profession</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
