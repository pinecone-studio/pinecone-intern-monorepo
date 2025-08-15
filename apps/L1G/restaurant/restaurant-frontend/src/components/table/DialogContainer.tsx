import { DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

export const DialogContainer = ({ content, title }: { content: ReactNode; title: string }) => {
  return (
    <DialogContent data-testid="admin-table-dialog-container" className="sm:max-w-[339px] rounded-md">
      <div className="flex w-full justify-between items-center">
        <DialogTitle>{title}</DialogTitle>
        <DialogClose data-cy="Admin-Table-Dialog-Close">
          <X className="w-4 h-4" />
        </DialogClose>
      </div>
      {content}
    </DialogContent>
  );
};
