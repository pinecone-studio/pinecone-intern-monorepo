'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pencil } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { passwordSchema, type PasswordFormValues } from '@/utils/UpdateUserUtils';
import { zodResolver } from '@hookform/resolvers/zod';

interface EditPasswordDialogProps {
  onUpdate: (newPassword: string) => Promise<void>;
  isLoading?: boolean;
}

export const EditPasswordDialog = ({ onUpdate, isLoading = false }: EditPasswordDialogProps) => {
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const onSubmit = async (data: PasswordFormValues) => {
    setUpdating(true);
    try {
      await onUpdate(data.newPassword);
      setOpen(false);
      form.reset();
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="p-1 h-8 w-8" data-testid="open-password-dialog">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" data-testid="password-dialog">
        <DialogHeader>
          <DialogTitle>Нууц үг</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="password-form">
            <DialogClose asChild className="absolute top-3 right-4">
              <Button type="button" variant="secondary" data-testid="close-password-dialog">
                x
              </Button>
            </DialogClose>
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Хуучин нууц үг" {...field} disabled={updating || isLoading} data-testid="current-password-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Шинэ нууц үг" {...field} disabled={updating || isLoading} data-testid="new-password-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Шинэ нууц үг давтах" {...field} disabled={updating || isLoading} data-testid="confirm-password-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-amber-800 hover:bg-amber-900 text-white" disabled={updating || isLoading} data-testid="password-submit">
              {updating ? 'Шинэчилж байна...' : 'Шинэчлэх'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
