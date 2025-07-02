'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { ChevronDownIcon } from 'lucide-react';

interface Props {
  control: any;
}

export const ProfileGenderInterest = ({ control }: Props) => (
  <FormField
    control={control}
    name="interestedIn"
    render={({ field }) => (
      <FormItem className="space-y-2">
        <FormLabel htmlFor="interestedIn">Gender Preferences:</FormLabel>
        <FormControl>
          <div className="relative">
            <select
              data-testid="profile-select"
              id="interestedIn"
              className="w-full h-10 px-3 py-2 bg-background border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
              {...field}
              onChange={(e) => field.onChange(e.target.value)}
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Everyone">Everyone</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
