'use client';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pencil, X } from 'lucide-react';
import { useState } from 'react';
import { useUpdateFoodMutation } from '@/generated';
import { UploadImage } from '@/utils/image-upload';
import { toast } from 'sonner';
import { FoodUpdateDialogProps } from '@/utils/food-types';
import { formSchemaFood } from '@/helpers/form-schemas';
import { FoodUpdateForm } from './FoodUpdateForm';

export const FoodUpdateDialog = ({ foodId, foodName, image, price, foodStatus, refetch }: FoodUpdateDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [updateFood, { loading }] = useUpdateFoodMutation();

  const handleSubmit = async (values: z.infer<typeof formSchemaFood>) => {
    try {
      let imageUrl: string;
      if (values.image instanceof File) {
        imageUrl = await UploadImage(values.image);
      } else {
        imageUrl = image;
      }

      await updateFood({
        variables: {
          foodId: foodId,
          input: {
            foodName: values.foodName,
            price: values.price,
            foodStatus: values.status,
            image: imageUrl,
          },
        },
      });
      await refetch();
      setIsOpen(false);
      toast.success('Хоол амжилттай шинэчлэгдлээ!', {
        position: 'bottom-right',
      });
    } catch (error) {
      toast.error('Хоол шинэчлэхэд алдаа гарлаа!', {
        position: 'bottom-right',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button data-cy="food-update-dialog-open" data-testid="food-update-dialog-open" variant="secondary" className="flex w-[36px] h-[36px] rounded-md px-4 py-2 bg-[#F4F4F5]">
          <div className="flex justify-center items-center gap-2">
            <Pencil className="w-4 h-4" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex w-full justify-between items-center">
          <DialogTitle data-testid="food-update-dialog-title" className="flex justify-start text-[18px] leading-[18px] font-semibold text-[#09090B]">
            Хоол засах
          </DialogTitle>
          <DialogClose data-testid="food-update-dialog-close">
            <X className="w-4 h-4" />
          </DialogClose>
        </div>
        <FoodUpdateForm foodName={foodName} price={price} foodStatus={foodStatus} image={image} onSubmit={handleSubmit} loading={loading} />
      </DialogContent>
    </Dialog>
  );
};
