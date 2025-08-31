import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { ReactElement } from 'react';

export type PropsType = {
  title: string;
  comment: string;
  submitText: string;
  onClick: () => void;
  children: ReactElement;
  className?: string;
};
export const DeleteDialog = ({ title, comment, submitText, children, onClick, className }: PropsType) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className={`flex w-[36px] h-[36px] rounded-md px-4 py-2 bg-[#F4F4F5] ` + className}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex w-full justify-between items-center">
          <DialogTitle data-testid="delete-dialog-title" className="flex justify-start text-[18px] leading-[18px] font-semibold text-[#09090B]">
            {title}
          </DialogTitle>
          <DialogClose>
            <X className="w-4 h-4" />
          </DialogClose>
        </div>
        <span className="text-base leading-[20px] text-[#71717A]">{comment}</span>
        <DialogClose asChild>
          <Button data-cy="delete-dialog-delete-button" data-testid="delete-dialog-delete-button" onClick={onClick} className="flex w-full h-[36px] rounded-md py-2 px-4 bg-[#1D1F24]" type="submit">
            {submitText}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
