'use client';

import { useState } from 'react';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useDeleteCategoryMutation } from '@/generated';

type Props = {
  categoryId: string;
  foodId?: number;
  onSuccess?: () => void;
};

const DeleteUpdateDialog = ({ categoryId, onSuccess }: Props) => {
  const [open, setOpen] = useState(false);
  const [deleteCategory, { loading: deleteLoading }] = useDeleteCategoryMutation();

  const handleDelete = async () => {
    try {
      await deleteCategory({
        variables: {
          input: { _id: categoryId },
        },
      });
      if (onSuccess) onSuccess();
      setOpen(false); 
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div className="flex items-center gap-7" data-testid="food-actions">
      <Dialog>
        <DialogTrigger asChild>
          <button data-testid="edit-trigger">
            <Pencil className="w-4 h-4" />
          </button>
        </DialogTrigger>
        <DialogContent data-testid="edit-dialog">
          <DialogHeader>
            <DialogTitle>Ангилал засах</DialogTitle>
            <DialogDescription>
              <Input type="text" placeholder="Ангилалын нэр" className="w-[291px] mt-2 mb-3" />
            </DialogDescription>
            <Button className="w-[291px]" data-testid="edit-submit">
              Шинэчлэх
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button  data-testid={`category-${categoryId}-delete-button`}>
            <Trash className="w-4 h-4" />
          </button>
        </DialogTrigger>
        <DialogContent data-testid={`category-${categoryId}-dialog`}>
          <DialogHeader>
            <DialogTitle>Цэснээс хасах</DialogTitle>
            <DialogDescription>Хасахдаа итгэлтэй байна уу?</DialogDescription>
            <Button
              className="w-[291px]"
              data-testid="delete-submit"
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? 'Хасаж байна...' : 'Хасах'}
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteUpdateDialog;
