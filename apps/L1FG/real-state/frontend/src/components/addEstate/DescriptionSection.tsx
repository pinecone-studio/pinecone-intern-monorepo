import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

const DescriptionSection = () => {
  const { control } = useFormContext();

  return (
    <div className="mb-4" data-cy="description-section">
      <div className="mt-4 mb-4 border-gray-300 rounded">
        <h2 className="text-xl font-bold mb-2">Тайлбар</h2>
        <p className="text-gray-700">Та үл хөдлөх хөрөнгийн дэлгэрэнгүй тайлбарыг оруулна уу.</p>
      </div>

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="block text-gray-700 font-bold mb-2">Дэлгэрэнгүй тайлбар:</FormLabel>
            <FormControl>
              <Textarea className="w-full p-2 border border-gray-300 rounded mb-4" placeholder="Тайлбар оруулна уу" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DescriptionSection;
