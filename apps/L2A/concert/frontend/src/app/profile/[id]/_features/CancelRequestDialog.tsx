'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useCreateCancelRequestMutation } from '@/generated';
import z from 'zod';
import { CancelRequestSchema } from '../../_utils/cancel-request-bankinfo-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Snackbar } from '@mui/material';

const CancelRequestDialog = ({ ticketId, userId, index }: { ticketId: string; userId: string; index: number }) => {
  const [createCancelRequest, { error, loading }] = useCreateCancelRequestMutation();

  const form = useForm<z.infer<typeof CancelRequestSchema>>({
    resolver: zodResolver(CancelRequestSchema),
    defaultValues: {
      bankName: '',
      accountNumber: '',
      bankOwnerName: '',
    },
  });
  const handleSubmit = async (values: z.infer<typeof CancelRequestSchema>) => {
    await createCancelRequest({ variables: { userId, ticketId, ...values } });
  };
  return (
    <Dialog>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={loading} message="Түр хүлээнэ үү!" />
      <Snackbar autoHideDuration={500} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={!!error} message={error?.message} />
      <DialogTrigger asChild>
        <Button data-testid={`cancel-request-button-${index}`}>Тасалбар буцаах</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Тасалбар буцаах</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className=" flex flex-col gap-2 py-5">
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Банкны нэр</FormLabel>
                    <FormControl>
                      <Input data-testid={`account-name-${index}`} placeholder="Банкны нэр" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дансны дугаар</FormLabel>
                    <FormControl>
                      <Input data-testid={`account-number-${index}`} placeholder="Дансны дугаар" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bankOwnerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Нэр</FormLabel>
                    <FormControl>
                      <Input data-testid={`account-owner-${index}`} placeholder="Эзэмшигчийн нэр" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogClose asChild>
                <Button data-testid={`send-cancel-request-${index}`} disabled={loading} type="submit">
                  Цуцлах хүсэлт илгээх
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CancelRequestDialog;
