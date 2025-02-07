import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TownDetails = () => {
  const { control } = useFormContext();

  return (
    <div className="p-6 mb-6 bg-white rounded-lg shadow-sm border border-gray-200" data-cy="town-details">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Байршил</h2>
        <p className="text-gray-600">Та үл хөдлөх хөрөнгийн байршлын мэдээллийг оруулна уу.</p>
      </div>

      <div className="space-y-6">
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Хот:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                    <SelectValue placeholder="Сонгоно уу" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ulaanbaatar">Улаанбаатар</SelectItem>
                  <SelectItem value="darkhan">Дархан</SelectItem>
                  <SelectItem value="erdenet">Эрдэнэт</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Дүүрэг:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                    <SelectValue placeholder="Сонгоно уу" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bayngol">Баянгол</SelectItem>
                  <SelectItem value="bayanzurkh">Баянзүрх</SelectItem>
                  <SelectItem value="sukhbaatar">Сүхбаатар</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="subDistrict"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Хороо:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                    <SelectValue placeholder="Сонгоно уу" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1-р хороо</SelectItem>
                  <SelectItem value="2">2-р хороо</SelectItem>
                  <SelectItem value="3">3-р хороо</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Хаяг:</FormLabel>
              <FormControl>
                <Input className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Дэлгэрэнгүй хаяг" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default TownDetails;
