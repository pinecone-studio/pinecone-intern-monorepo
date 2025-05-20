'use client';
import { MiddleHeader } from '../../_components/MiddleHeader';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import * as React from 'react';
import { useUpdatePasswordMutation } from '@/generated';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ChevronRight, Key } from 'lucide-react';

const formSchema = z
  .object({
    password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
    confirm: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
  })
  .superRefine(({ password, confirm }, ctx) => {
    if (password !== confirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ['confirm'],
      });
    }
  });

export const UpdatePassword = () => {
  const [open, setOpen] = React.useState(false);
  const serachParams = useSearchParams();
  const userId = serachParams.get('userId');

  const [UpdatePassword] = useUpdatePasswordMutation({
    onCompleted: () => {
      toast.success('Successfully updated!');
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirm: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await UpdatePassword({
      variables: {
        id: userId!,
        password: values.password,
      },
    });
    setOpen(false);
  };

  return (
    <div data-cy="Security-Page">
      <MiddleHeader h3="Security & Settings" p="keep your account safe with a secure password" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex items-center justify-between px-4 w-[326px] h-[72px] border-[1px] rounded-[12px]">
          <div className="flex items-center gap-4">
            <Key size={20} />
            <p className="text-[14px]">Change password</p>
          </div>
          <ChevronRight size={15} />
        </DialogTrigger>
        <DialogContent data-cy="Password-Dialog">
          <DialogHeader>
            <DialogTitle>Are you sure you want to update your password?</DialogTitle>
            <DialogDescription>This action will update your password. Make sure to remember the new password.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input data-cy="Security-Password-Input" className="focus-visible:ring-0" placeholder="Placeholder" {...field} />
                    </FormControl>
                    <FormMessage data-cy="Security-Password-Input-Error-Message" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input data-cy="Security-Confirm-Input" className="focus-visible:ring-0" placeholder="Placeholder" {...field} />
                    </FormControl>
                    <FormMessage data-cy="Security-Confirm-Input-Error-Message" />
                  </FormItem>
                )}
              />
              <Button data-cy="Security-Update-Button" className="bg-[#2563eb]" type="submit">
                Update password
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
