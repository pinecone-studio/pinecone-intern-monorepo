import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Minus, X } from 'lucide-react';
import { useDeleteCategoryMutation } from '@/generated';
import { toast } from 'sonner';

interface DeleteInpt {
  foodId: string;
  refetch: any;
}

const DeleteFoodDia = ({ foodId, refetch }: DeleteInpt) => {
  const [deleteFoodCate, { loading }] = useDeleteCategoryMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteFoodCate({
        variables: {
          input: {
            id: foodId,
          },
        }, // Passing foodId as categoryId
      });

      setIsOpen(false);
      toast.success('Амжилттай устгалаа!'); // Show success message
      await refetch();
    } catch (err) {
      console.log(err);
      toast.error('Алдаа гарлаа! Дахин оролдоно уу.');
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button data-testid="trig-btn" className="h-max p-2">
          <Minus width={16} height={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px] flex pt-4 flex-col gap-4">
        <div className="flex flex-col">
          <div className="w-full flex justify-end">
            <DialogClose data-testid="close-btn">
              <X height={16} width={16} />
            </DialogClose>
          </div>
          <div className="text-[#09090B] text-lg font-semibold">Цэснээс хасах</div>
          <div className="mt-1 text-[#71717A] font-normal text-sm ">Хасахдаа итгэлтэй байна уу</div>
        </div>
        <Button data-testid="delete-btn" onClick={handleDelete} disabled={loading}>
          {loading ? 'Устгаж байна...' : 'Хасах'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFoodDia;
