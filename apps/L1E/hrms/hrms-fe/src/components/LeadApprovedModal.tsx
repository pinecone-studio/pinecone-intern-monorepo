'use client';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  employeeName: string;
  text: {
    header: string;
    description: string;
  };
}

export const LeadApprovedModal = ({ isOpen, employeeName, onClose, onSubmit, text }: ConfirmationModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{text.header}</AlertDialogTitle>
          <AlertDialogDescription>
            Та {employeeName}
            {text.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-cy="reject-modal">Буцах</AlertDialogCancel>
          <AlertDialogAction data-cy="approve-modal" data-testid="approve-btn" onClick={onSubmit}>
            Зөвшөөрөх
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
