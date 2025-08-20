'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { phoneSchema, type PhoneFormValues } from '@/utils/UpdateUserUtils';

interface EditPhoneDialogProps {
  phone: string;
  onUpdate: (phone: string) => Promise<void>;
  isLoading?: boolean;
}

export const EditPhoneDialog = ({ phone, onUpdate, isLoading = false }: EditPhoneDialogProps) => {
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: phone,
    },
  });

  const onSubmit = async (data: PhoneFormValues) => {
    setUpdating(true);
    try {
      await onUpdate(data.phone);
      setOpen(false);
      form.reset({ phone: data.phone });
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
          <DialogHeader>
            <DialogTitle>Утас</DialogTitle>
          </DialogHeader>
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="0000-0000" {...field} disabled={updating || isLoading} />
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
