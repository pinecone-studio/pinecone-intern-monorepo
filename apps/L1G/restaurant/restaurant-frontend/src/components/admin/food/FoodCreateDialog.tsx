'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { GetFoodsQuery, useCreateFoodMutation } from '@/generated';
import { UploadImage } from '@/utils/ImageUpload';
import { RadioInput, SelectCategoryInput, TextInput } from '@/components/admin';
import { toast } from 'sonner';
import { ApolloQueryResult } from '@apollo/client';
import { formSchemaFood, initialValuesFood } from '@/helpers/form-schemas';

export const FoodCreateDialog = ({ refetch }: { refetch: () => Promise<ApolloQueryResult<GetFoodsQuery>> }) => {
  const [foodImage, setFoodImage] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [createFood] = useCreateFoodMutation();
  const form = useForm<z.infer<typeof formSchemaFood>>({
    resolver: zodResolver(formSchemaFood),
    defaultValues: initialValuesFood,
  });

  const onSubmit = async (values: z.infer<typeof formSchemaFood>) => {
    try {
      const imageUrl = await UploadImage(values.image);

      await createFood({
        variables: {
          input: {
            foodName: values.foodName,
            price: values.price,
            status: values.status,
            image: imageUrl,
            categoryId: values.category,
          },
        },
      });
      await refetch();
      form.reset();
      setFoodImage('');
      setIsOpen(false);
      toast.success('Хоол амжилттай үүслээ!', {
        position: 'bottom-right',
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Хоол үүсгэхэд алдаа гарлаа!', {
        position: 'bottom-right',
      });
    }
  };

  const handleDeleteImage = () => {
    setFoodImage('');
    form.setValue('image', undefined, { shouldValidate: true });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          data-cy="create-food-dialog-open"
          data-testid="create-food-dialog-open"
          variant="link"
          className="flex w-[89px] h-[40px] rounded-md px-4 py-2 gap-2 border solid border-[#E4E4E7] bg-[#FFFFFF] text-sm leading-[20px] font-medium text-[#09090B]"
        >
          <div className="flex justify-center items-center gap-2">
            <p className="text-sm leading-[20px] font-medium text-[#09090B]">Хоол</p>
            <Plus className="w-4 h-4" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex w-full justify-between items-center">
          <DialogTitle data-cy="create-food-dialog-title" data-testid="create-food-dialog-title" className="flex justify-start text-[18px] leading-[18px] font-semibold text-[#09090B]">
            Хоол нэмэх
          </DialogTitle>
          <DialogClose data-testid="create-food-dialog-close">
            <X className="w-4 h-4" />
          </DialogClose>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <TextInput data-cy="create-food-foodName-input" data-testid="create-food-foodname-input" control={form.control} fieldName="foodName" placeholder="Хоолны нэр" />
            <RadioInput control={form.control} />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <Button variant="ghost" className={`flex w-full h-[52px] rounded-md p-4 has-[>svg]:px-0 bg-[#F4F4F5] border solid border-[#E4E4E7] ${foodImage && 'w-full h-[150px] p-0'}`}>
                    <div className={`flex justify-center items-center gap-2 ${foodImage && 'absolute z-0'} `}>
                      <Plus className="flex w-4 h-4" />
                      <p className="text-sm leading-[20px] text-[#202223]">Зураг нэмэх</p>
                    </div>
                    <FormControl>
                      <Input
                        data-cy="create-food-image-input"
                        data-testid="create-food-image-input"
                        className="flex absolute opacity-0"
                        type="file"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (!file) return;
                          field.onChange(file);
                          form.setValue('image', file, { shouldValidate: true });
                          setFoodImage(URL.createObjectURL(file));
                        }}
                      />
                    </FormControl>
                    {foodImage && (
                      <div data-testid="create-food-image-preview" className="flex relative w-full h-[150px] justify-center items-center rounded-md">
                        <Image data-testid="create-food-food-image" fill src={foodImage} alt="image" id="image" className="w-[300px] h-[300px] rounded-md" />
                        <div
                          data-testid="create-food-image-delete-button"
                          onClick={handleDeleteImage}
                          className="flex w-[36px] h-[36px] px-4 py-2 absolute right-[10px] top-[10px] justify-center items-center border solid border-[#E4E4E7] bg-neutral-200 rounded-full"
                        >
                          <X className="flex w-4 h-4 stroke-[#18181B] fill-[#18181B] absolute" />
                        </div>
                      </div>
                    )}
                  </Button>
                  <FormMessage data-cy="create-food-image-error-message" />
                </FormItem>
              )}
            />
            <SelectCategoryInput control={form.control} />
            <TextInput data-cy="create-food-price-input" data-testid="create-food-price-input" control={form.control} fieldName="price" placeholder="Үнэ" />
            <Button data-cy="create-food-submit-button" data-testid="create-food-submit-button" className="flex w-full h-[36px] rounded-md py-2 px-4 bg-[#1D1F24] " type="submit">
              Үүсгэх
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
