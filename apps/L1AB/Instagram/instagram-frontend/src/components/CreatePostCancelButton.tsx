'use client';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose, DialogDescription, DialogTrigger } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

type CreatePostCancelButtonProps = {
  onOpenChange: () => void; 
};

export const CreatePostCancelButton: React.FC<CreatePostCancelButtonProps> = ({ onOpenChange }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='text-blue-500' variant="outline">
  Cancel
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Discard post?</DialogTitle>
          <DialogDescription>If you leave, your edits won’t be saved.</DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:flex-row-reverse justify-end gap-4 pl-56">
          <Button className="text-red-600" type="button" onClick={onOpenChange} variant="secondary">
            Discard
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostCancelButton;
