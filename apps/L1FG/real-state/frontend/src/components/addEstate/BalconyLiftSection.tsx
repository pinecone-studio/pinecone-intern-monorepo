import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BalconyLiftSection = () => {
  const { control } = useFormContext();

  return (
    <div className="p-6 mb-6 bg-white rounded-lg shadow-sm border border-gray-200" data-cy="balcony-lift-section">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Тагт ба лифт</h2>
        <p className="text-gray-600">Та тагт болон лифтний мэдээллийг оруулна уу.</p>
      </div>

      <div className="space-y-6">
        <FormField
          control={control}
          name="balcony"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Тагт:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                    <SelectValue placeholder="Сонгоно уу" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">Тийм</SelectItem>
                  <SelectItem value="false">Үгүй</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="lift"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Лифт:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                    <SelectValue placeholder="Сонгоно уу" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">Тийм</SelectItem>
                  <SelectItem value="false">Үгүй</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default BalconyLiftSection;
