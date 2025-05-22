import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const DeleteUpdateDialog = () => {
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

      <Dialog>
        <DialogTrigger asChild>
          <button data-testid="delete-trigger">
            <Trash className="w-4 h-4" />
          </button>
        </DialogTrigger>
        <DialogContent data-testid="delete-dialog">
          <DialogHeader>
            <DialogTitle>Цэснээс хасах</DialogTitle>
            <DialogDescription>Хасахдаа итгэлтэй байна уу?</DialogDescription>
            <Button className="w-[291px]" data-testid="delete-submit">
              Хасах
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteUpdateDialog;