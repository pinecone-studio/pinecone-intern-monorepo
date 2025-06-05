'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Concert, useUpdateEventInfoMutation } from '@/generated';
import { Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { EditEventInfoSchema } from '../utils/edit-event-info-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Snackbar, CircularProgress } from '@mui/material';

type Props = {
  concert: Concert;
  idx: number;
};

const EditEventInfo = ({ concert, idx }: Props) => {
  const [UpdateEventInfo, { error, loading, data }] = useUpdateEventInfoMutation();

  const form = useForm<z.infer<typeof EditEventInfoSchema>>({
    resolver: zodResolver(EditEventInfoSchema),
    defaultValues: {
      title: concert.title,
      description: concert.description,
      artistName: concert.artistName,
    },
  });

  const onSubmit = async (values: z.infer<typeof EditEventInfoSchema>) => {
    await UpdateEventInfo({
      variables: { ...values, concertId: concert.id },
      refetchQueries: ['concerts'],
    });
  };

  return (
    <>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={loading} message="Түр хүлээнэ үү..." />
      <Snackbar open={!!data} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} message="Мэдээлэл амжилттай шинэчлэгдлээ!" />
      <Snackbar open={!!error} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} message={error?.message} />

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" title="Засах" data-testid={`edit-btn-${idx}`}>
            <Pencil className="h-4 w-4 hover:text-blue-500" />
          </Button>
        </DialogTrigger>

        <DialogContent className="w-[700px]">
          <DialogTitle>Концерт засах</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Тоглолтын нэр*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Хөтөлбөрийн тухай*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="artistName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Уран бүтээлчийн нэр*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button data-testid={`edit-event-button-${idx}`} disabled={!form.formState.isValid || form.formState.isSubmitting}>
                {form.formState.isSubmitting ? <CircularProgress size={18} /> : 'Засах'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditEventInfo;
