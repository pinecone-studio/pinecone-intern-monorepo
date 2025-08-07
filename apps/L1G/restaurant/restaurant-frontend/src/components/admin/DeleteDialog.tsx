import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { ReactElement } from 'react';

export type PropsType = {
  title: string;
  comment: string;
  submit: string;
  onClick: () => void;
  children: ReactElement;
};
export const DeleteDialog = ({ title, comment, submit, children, onClick }: PropsType) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex w-[89px] h-[40px] rounded-md px-4 py-2 gap-2 border solid border-[#E4E4E7] bg-[#FFFFFF] text-sm leading-[20px] font-medium text-[#09090B]">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex w-full justify-between items-center">
          <DialogTitle className="flex justify-start text-[18px] leading-[18px] font-semibold text-[#09090B]">{title}</DialogTitle>
          <DialogClose>
            <X className="w-4 h-4" />
          </DialogClose>
        </div>
        <span className="text-base leading-[20px] text-[#71717A]">{comment}</span>
        <DialogClose asChild>
          <Button onClick={onClick} className="flex w-full h-[36px] rounded-md py-2 px-4 bg-[#1D1F24] " type="submit">
            {submit}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
