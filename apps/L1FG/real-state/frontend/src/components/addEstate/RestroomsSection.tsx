import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const RestroomsSection = () => {
  const { control } = useFormContext();

  return (
    <div className="mb-4" data-cy="restrooms-section">
      <div className="mt-4 mb-4 border-gray-300 rounded">
        <h2 className="text-xl font-bold mb-2">Ариун цэврийн өрөө</h2>
        <p className="text-gray-700">Та ариун цэврийн өрөөний тоог оруулна уу.</p>
      </div>

      <FormField
        control={control}
        name="restrooms"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="block text-gray-700 font-bold mb-2">Ариун цэврийн өрөөний тоо:</FormLabel>
            <FormControl>
              <Input type="number" min="0" className="w-full p-2 border border-gray-300 rounded mb-4" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default RestroomsSection;
