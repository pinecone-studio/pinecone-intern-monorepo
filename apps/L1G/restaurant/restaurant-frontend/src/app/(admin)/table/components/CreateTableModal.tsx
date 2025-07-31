'use client';
import { Plus } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TableForm } from './TableForm';

export const CreateTableModal = () => {
  const formSchema = z.object({
    foodName: z.string().min(1, { message: 'Ширээний нэр оруулна уу' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodName: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="w-[600px] flex justify-between">
      <h1 className="font-semibold text-[28px]">Ширээ</h1>
      <Dialog>
        <DialogTrigger className="text-[14px] font-medium bg-white border border-[#E4E4E7] rounded-md flex py-2 px-4  justify-center items-center gap-1">
          Ширээ <Plus className="h-4 w-4 stroke-[2px]" />
        </DialogTrigger>
        <TableForm
          title="Ширээ нэмэх"
          content={
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="foodName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Ширээний нэр" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full bg-[#1D1F24]" type="submit">
                  Үүсгэх
                </Button>
              </form>
            </Form>
          }
        />
      </Dialog>
    </div>
  );
};
