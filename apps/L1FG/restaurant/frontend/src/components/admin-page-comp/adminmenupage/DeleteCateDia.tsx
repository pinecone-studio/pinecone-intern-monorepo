import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Trash, X } from 'lucide-react';
import { useRealDeleteCategoryMutation } from '@/generated';
import { toast } from 'sonner';

interface DeleteInpt {
  cateId: string;
  refetch: any;
}

const DeleteCateDia = ({ cateId, refetch }: DeleteInpt) => {
  const [deleteCate, { loading }] = useRealDeleteCategoryMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteCate({
        variables: {
          deleteCategoryId: cateId,
        },
      });

      setIsOpen(false);
      toast.success('Амжилттай устгалаа!');
      await refetch();
    } catch (err) {
      console.log(err);
      toast.error('Алдаа гарлаа! Дахин оролдоно уу.');
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="h-max p-2 bg-[#F4F4F5] rounded-md cursor-pointer" data-testid="delete-button">
          <Trash width={16} height={16} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px] flex pt-4 flex-col gap-4">
        <div className="flex flex-col">
          <div className="w-full flex justify-end">
            <DialogClose>
              <X height={16} width={16} />
            </DialogClose>
          </div>
          <div className="text-[#09090B] text-lg font-semibold">Цэс устгах</div>
          <div className="mt-1 text-[#71717A] font-normal text-sm ">Устгахдаа итгэлтэй байна уу</div>
        </div>
        <Button onClick={handleDelete} disabled={loading}>
          {loading ? 'Устгаж байна...' : 'устгах'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCateDia;
