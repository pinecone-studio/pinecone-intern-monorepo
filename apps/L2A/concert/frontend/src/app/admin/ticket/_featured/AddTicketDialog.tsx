'use client';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AddTicketSchema } from '../utils/add-ticket-schema';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { AddTicketDefaultValues } from '../utils/add-ticket-default-values';
import AddTicketInfoInput from '../_components/AddTicketinfoinputs';
import AddTicketTimeInput from '../_components/AddTicketTimeInputs';
import AddTicketSeatInput from '../_components/AddTicketSeatInputs';
import AddTicketVenueInputs from '../_components/AddTicketVenueInfoInputs';
import { useEffect } from 'react';
import AddTicketImageURLInput from '../_components/AddTicketImageUrlInput.tsx';

const AddTicketDialog = () => {
  const form = useForm<z.infer<typeof AddTicketSchema>>({
    resolver: zodResolver(AddTicketSchema),
    defaultValues: AddTicketDefaultValues,
    mode: 'onChange',
  });

  const onSubmit = async (values: z.infer<typeof AddTicketSchema>) => {
    console.log(values);
  };
  useEffect(() => {
    console.log(form.formState.errors);
  }, [form]);
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="bg-foreground text-background p-2 rounded-xl hover:bg-secondary hover:text-foreground">Концерт нэмэх</div>
        </DialogTrigger>
        <DialogContent className=" w-[700px]">
          <DialogTitle>Концерт нэмэх</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-4 text-xs">
              <div className=" flex flex-col gap-2">
                <AddTicketInfoInput form={form} />
                <AddTicketImageURLInput form={form} />
                <AddTicketVenueInputs form={form} />
                <AddTicketTimeInput form={form} />
                <AddTicketSeatInput form={form} />
              </div>
              <Button disabled={form.formState.isSubmitting}>Click here</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTicketDialog;
