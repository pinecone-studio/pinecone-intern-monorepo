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
import { useDeleteCategoryMutation, useUpdateCategoryMutation} from '@/generated';

  type Props = {
    categoryId: string;
    initialName: string;
    onSuccess?: () => void;
  };

const DeleteUpdateDialog = ({ categoryId, initialName, onSuccess }: Props) => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [categoryName, setCategoryName] = useState(initialName);

  const [deleteCategory, { loading: deleteLoading }] = useDeleteCategoryMutation();
  const [updateCategory, { loading: updateLoading }] = useUpdateCategoryMutation();

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

  const handleUpdate = async () => {
    try {
      await updateCategory({
        variables: {
          input: {
            _id: categoryId,
            name: categoryName,
          },
        },
      });
      if (onSuccess) onSuccess();
      setEditOpen(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <div className="flex items-center gap-7" data-testid="food-actions">
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogTrigger asChild>
          <button data-testid="edit-trigger">
            <Pencil className="w-4 h-4" />
          </button>
        </DialogTrigger>
        <DialogContent data-testid="edit-dialog">
          <DialogHeader>
            <DialogTitle>Ангилал засах</DialogTitle>
            <DialogDescription>
              <Input
                type="text"
                placeholder="Ангилалын нэр"
                className="w-[291px] mt-2 mb-3"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </DialogDescription>
            <Button
              className="w-[291px]"
              data-testid="edit-submit"
              onClick={handleUpdate}
              disabled={updateLoading}
            >
              {updateLoading ? 'Шинэчилж байна...' : 'Шинэчлэх'}
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button data-testid={`category-${categoryId}-delete-button`}>
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
