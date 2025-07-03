'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  control: any;
}

export const ProfileBioField = ({ control }: Props) => (
  <FormField
    control={control}
    name="bio"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Bio</FormLabel>
        <FormControl>
          <Textarea placeholder="Tell us a little bit about yourself" className="resize-none" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
