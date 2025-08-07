'use client';
import { Trash } from 'lucide-react';
import { DeleteDialog } from '..';
import { useDeleteFoodMutation } from '@/generated';
import { useState } from 'react';
import { AddFoodDialog } from './AddFoodDialog';

export const Foods = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteFood] = useDeleteFoodMutation();
  const foodId = '6894156c77b7a40c3ef2c6ba';
  const handleDeleteButton = async (foodId: string) => {
    try {
      await deleteFood({
        variables: { foodId: foodId },
      });
    } catch (error) {
      console.error(error, 'err');
    }
  };
  return (
    <div>
      <AddFoodDialog />
      <DeleteDialog title="Устгах" comment="Устгахдаа итгэлтэй байна уу" submit="Устгах" children={<Trash className="w-4 h-4" />} onClick={() => handleDeleteButton(foodId)} />
    </div>
  );
};
