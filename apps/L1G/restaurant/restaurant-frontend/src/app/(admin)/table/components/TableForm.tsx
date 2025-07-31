import { DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';

import { X } from 'lucide-react';
import { ReactNode } from 'react';
export const TableForm = ({ content, title }: { content: ReactNode; title: string }) => {
  return (
    <DialogContent data-testid="table-form" className="sm:max-w-[339px]">
      <div className="flex w-full justify-between items-center">
        <DialogTitle data-testid="DialogTitle">{title}</DialogTitle>
        <DialogClose>
          <X className="w-4 h-4" />
        </DialogClose>
      </div>
      {content}
    </DialogContent>
  );
};
