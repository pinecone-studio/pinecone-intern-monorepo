'use client';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Dispatch, SetStateAction } from 'react';

interface ConfirmationModalProps {
  isOpenModal: boolean;
  onClose: () => void;
  onConfirm: () => void;
  setRefuseValue: Dispatch<SetStateAction<string | undefined>>;
}

export const RefuseModal = ({ isOpenModal, onClose, onConfirm, setRefuseValue }: ConfirmationModalProps) => {
  return (
    <AlertDialog open={isOpenModal} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Татгалзсан шалтгаан</AlertDialogTitle>
          <AlertDialogDescription>Тухайн ажилтанд яагаад татгалзаж байгаагаа тайлбарлан бичнэ үү.</AlertDialogDescription>
          <Textarea
            data-cy="areaButton"
            data-testid="areaButton"
            onChange={(e) => {
              setRefuseValue(e.target.value);
            }}
            className="h-[150px]"
            placeholder="Энд бичнэ үү"
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-cy="refuse-modal-button-back">Буцах</AlertDialogCancel>
          <AlertDialogAction data-cy="refuse-modal-button" onClick={onConfirm}>
            Татгалзах
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
