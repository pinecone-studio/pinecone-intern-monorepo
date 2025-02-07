import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const WindowsSection = () => {
  const { control } = useFormContext();

  return (
    <div className="p-6 mb-6 bg-white rounded-lg shadow-sm border border-gray-200" data-cy="windows-section">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Цонх</h2>
        <p className="text-gray-600">Та цонхны тоо болон төрлийг оруулна уу.</p>
      </div>

      <div className="space-y-6">
        <FormField
          control={control}
          name="windowsCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Цонхны тоо:</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="windowType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Цонхны төрөл:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                    <SelectValue placeholder="Сонгоно уу" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="wood">Мод</SelectItem>
                  <SelectItem value="pvc">PVC</SelectItem>
                  <SelectItem value="aluminum">Хөнгөн цагаан</SelectItem>
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

export default WindowsSection;
