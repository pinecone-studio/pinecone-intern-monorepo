import React from 'react';
import { useFormContext } from 'react-hook-form';
import { HouseTypeEnum } from '@/generated';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PropertyDetails = () => {
  const { control } = useFormContext();

  return (
    <div className="p-6 mb-6 bg-white rounded-lg shadow-sm border border-gray-200" data-cy="property-details">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Ерөнхий мэдээлэл</h2>
        <p className="text-gray-600">Та үл хөдлөх хөрөнгийн ерөнхий мэдээллийг оруулна уу.</p>
      </div>

      <div className="space-y-6">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Гарчиг:</FormLabel>
              <FormControl>
                <Input className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Үнэ:</FormLabel>
              <FormControl>
                <Input
                  type="number"
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
          name="houseType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Байшингийн төрөл:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                    <SelectValue placeholder="Сонгоно уу" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={HouseTypeEnum.Apartment}>Орон сууц</SelectItem>
                  <SelectItem value={HouseTypeEnum.House}>Хувийн сууц</SelectItem>
                  <SelectItem value={HouseTypeEnum.Office}>Оффис</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Талбайн хэмжээ (м²):</FormLabel>
              <FormControl>
                <Input
                  type="number"
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
          name="totalRooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Нийт өрөө:</FormLabel>
              <FormControl>
                <Input
                  type="number"
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
          name="garage"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Гараж:</FormLabel>
              <Select onValueChange={(value) => field.onChange(value === 'true')} defaultValue={field.value?.toString()}>
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

export default PropertyDetails;
