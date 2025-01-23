'use client';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const LogoutModal = ({ isOpen, onClose, onSubmit }: ConfirmationModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Та гарахад итгэлтэй байна уу </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-cy="reject-modal" data-testid="reject-modal">
            Үгүй
          </AlertDialogCancel>
          <AlertDialogAction data-cy="approve-modal" data-testid="approve-modal" onClick={onSubmit}>
            Тийм
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
