'use client';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface ConfirmationModalProps {
  isOpenModal: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ApproveModal = ({ isOpenModal, onClose, onConfirm }: ConfirmationModalProps) => {
  return (
    <AlertDialog open={isOpenModal} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Та итгэлтэй байна уу?</AlertDialogTitle>
          <AlertDialogDescription>Чөлөөний хүсэлтийг зөвшөөрснөөр тухайн ажилтан руу хүсэлт нь баталгаажсан гэсэн мессеж Teams Chat -аар очно.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Буцах</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Зөвшөөрөх</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
