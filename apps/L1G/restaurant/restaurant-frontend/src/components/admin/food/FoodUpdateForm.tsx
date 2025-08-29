'use client';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ChevronDown, Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { FoodUpdateFormProps } from '@/utils/FoodTypes';
import { TextInput } from './FormTextInput';
import { formSchemaFood } from '@/helpers/form-schemas';
import Image from 'next/image';
import { RadioInput } from './FormRadioInput';

const updateFormDefaults = (foodName: string, price: string, image: string | undefined, categoryId: string, foodStatus: string) => ({
  foodName: foodName || '',
  price: price || '',
  image: image || undefined,
  category: categoryId || '',
  status: foodStatus as 'Идэвхитэй' | 'Идэвхигүй',
});

export const FoodUpdateForm = ({ foodName, price, foodStatus, image, category, onSubmit, isSubmitting }: FoodUpdateFormProps) => {
  const [foodImage, setFoodImage] = useState<string>('');

  const form = useForm<z.infer<typeof formSchemaFood>>({
    resolver: zodResolver(formSchemaFood),
    defaultValues: updateFormDefaults(foodName, price, image, category.categoryId, foodStatus),
  });
  useEffect(() => {
    form.reset({
      foodName: foodName || '',
      price: price || '',
      image: image || undefined,
      category: category.categoryId || '',
      status: foodStatus as 'Идэвхитэй' | 'Идэвхигүй',
    });
  }, [foodName, price, image, category.categoryId, foodStatus, form]);

  useEffect(() => {
    if (image) {
      setFoodImage(image);
      form.setValue('image', image, { shouldValidate: true });
    } else {
      setFoodImage('');
      form.setValue('image', undefined, { shouldValidate: true });
    }
  }, [image, form]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    form.setValue('image', file, { shouldValidate: true });
    setFoodImage(URL.createObjectURL(file));
  };

  const handleDeleteImage = () => {
    setFoodImage('');
    form.setValue('image', undefined, { shouldValidate: true });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <TextInput data-cy="food-update-foodName-input" data-testid="food-update-foodName-input" control={form.control} fieldName="foodName" placeholder="Хоолны нэр" />
        <RadioInput control={form.control} />
        <FormField
          control={form.control}
          name="image"
          render={({ field: _field }) => (
            <FormItem>
              <Button type="button" variant="ghost" className={`flex w-full h-[52px] rounded-md p-4 has-[>svg]:px-0 bg-[#F4F4F5] border solid border-[#E4E4E7] ${foodImage && 'w-full h-[150px] p-0'}`}>
                <div className={`flex justify-center items-center gap-2 ${foodImage && 'absolute z-0'} `}>
                  <Plus className="flex w-4 h-4" />
                  <p className="text-sm leading-[20px] text-[#202223]">Зураг нэмэх</p>
                </div>
                <FormControl>
                  <Input data-testid="food-update-image-input" className="absolute opacity-0" type="file" accept="image/*" onChange={handleImageChange} />
                </FormControl>
                {foodImage && (
                  <div data-testid="food-update-image-preview" className="flex relative w-full h-[150px] justify-center items-center rounded-md">
                    <Image data-testid="food-update-food-image" fill src={foodImage} alt="image" id="image" sizes="auto" className="w-[300px] h-[300px] rounded-md" />
                    <div
                      data-testid="food-update-image-delete-button"
                      onClick={handleDeleteImage}
                      className="flex w-[36px] h-[36px] px-4 py-2 absolute right-[10px] top-[10px] justify-center items-center border solid border-[#E4E4E7] bg-neutral-200 rounded-full"
                    >
                      <X className="flex w-4 h-4 stroke-[#18181B] fill-[#18181B] absolute" />
                    </div>
                  </div>
                )}
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field: _field }) => (
            <FormItem>
              <div className="relative">
                <FormControl>
                  <button
                    type="button"
                    data-testid="food-update-category-select"
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!!category.categoryName}
                  >
                    <span>{category.categoryName}</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </button>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <TextInput data-testid="food-update-price-input" control={form.control} fieldName="price" placeholder="Үнэ" />
        <Button data-cy="food-update-submit-button" data-testid="food-update-submit-button" className="flex w-full h-[36px] rounded-md py-2 px-4 bg-[#1D1F24] " type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Шинэчилж байна...' : 'Шинэчлэх'}
        </Button>
      </form>
    </Form>
  );
};
