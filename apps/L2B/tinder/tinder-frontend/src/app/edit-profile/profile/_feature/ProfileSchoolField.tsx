'use client';

import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

interface Props {
  control: any;
}

export const ProfileSchoolField = ({ control }: Props) => (
  <FormField
    control={control}
    name="school"
    render={({ field }) => (
      <FormItem className="w-full">
        <FormLabel>School/Work</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
