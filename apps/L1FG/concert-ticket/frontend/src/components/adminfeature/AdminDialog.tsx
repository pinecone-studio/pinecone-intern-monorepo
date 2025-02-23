import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FormData } from './concert-type';
import { useConcertForm } from '../admincontext/DialogContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { validateForm, showToasts } from './Validation';
import { FormSection } from './FormSection';

interface AdminDialogProps {
  onSubmit?: (_data: FormData) => void;
}

export const AdminDialog = ({ onSubmit: _onSubmit }: AdminDialogProps) => {
  const { formData, handleSubmit } = useConcertForm();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [open, setOpen] = useState(false);

  const onSubmitWithValidation = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm(formData, setErrors);
    showToasts(isValid);

    if (isValid) {
      await handleSubmit(e as React.FormEvent<HTMLFormElement>);
      setOpen(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button role="create" className="bg-black" variant="outline">
            Тасалбар нэмэх
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white h-screen overflow-y-scroll pt-5 pb-5 pr-5 pl-5">
          <form onSubmit={onSubmitWithValidation} data-testid="admin-form">
            <DialogHeader>
              <DialogTitle>Тасалбар нэмэх</DialogTitle>
            </DialogHeader>
            <FormSection formData={formData} errors={errors} />
            <DialogFooter>
              <div className="mt-2">
                <Button type="submit">Үүсгэх</Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
