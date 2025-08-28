'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { emailSchema, type EmailFormValues } from '@/utils/UpdateUserUtils';

interface EditEmailDialogProps {
  currentEmail: string;
  onUpdate: (email: string) => Promise<void>;
  isLoading?: boolean;
}
export const EditEmailDialog = ({ currentEmail, onUpdate, isLoading = false }: EditEmailDialogProps) => {
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: currentEmail,
    },
  });

  const onSubmit = async (data: EmailFormValues) => {
    try {
      await onUpdate(data.email);
      setOpen(false);
      form.reset({ email: data.email });
    } catch (error) {
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Имэйл хаяг</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogClose asChild className="absolute top-3 right-4">
              <Button type="button" variant="secondary">
                x
              </Button>
            </DialogClose>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Шинэчлэх хаяг" type="email" {...field} disabled={updating || isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-amber-800 hover:bg-amber-900 text-white" disabled={updating || isLoading}>
              {updating ? 'Шинэчилж байна...' : 'Шинэчлэх'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
