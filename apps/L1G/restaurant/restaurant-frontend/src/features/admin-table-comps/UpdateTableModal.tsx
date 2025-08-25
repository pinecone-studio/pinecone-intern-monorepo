'use client';
import { Pen } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DialogContainer } from '@/components/table/DialogContainer';
import { ApolloQueryResult } from '@apollo/client';
import { GetTablesQuery, useUpdateTableMutation } from '@/generated';
import { useState } from 'react';
import { toast } from 'sonner';

type UpdateTableModalProps = {
  refetch: () => Promise<ApolloQueryResult<GetTablesQuery>>;
  data: string;
};

export const UpdateTableModal = ({ data, refetch }: UpdateTableModalProps) => {
  const [UpdateTable, { loading }] = useUpdateTableMutation();
  const [open, setOpen] = useState(false);
  const formSchema = z.object({
    tableName: z.string().min(1, { message: 'Ширээний нэр оруулна уу' }).max(10, { message: '10-c доош тэмдэгт ашиглана уу' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tableName: '',
    },
  });

  const handleUpdateTable = async (values: z.infer<typeof formSchema>) => {
    try {
      await UpdateTable({
        variables: {
          tableId: data,
          input: {
            tableName: values.tableName,
            tableQR: '',
          },
        },
      });

      refetch();

      form.reset();

      toast.success('Ширээ амжилттай шинчлэгдлээ');

      setOpen(false);
    } catch (error) {
      toast.error('Ширээ үүссэн байна! өөр нэр сонгоно уу');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger data-cy="Admin-Update-Table-Dialog-Trigger" className="bg-[#F4F4F5] text-[14px]  rounded-md flex w-[36px] h-[36px] justify-center items-center">
        <Pen className="w-[13.22px] h-[13.22px]" />
      </DialogTrigger>
      <DialogContainer
        title="Ширээ засах"
        content={
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateTable)} className="space-y-4">
              <FormField
                control={form.control}
                name="tableName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input data-cy="Admin-Update-Table-Input" placeholder="Ширээний нэр" {...field} />
                    </FormControl>
                    <FormMessage data-testid="Admin-Create-Table-Error-Message" />
                  </FormItem>
                )}
              />
              <Button data-cy="Admin-Update-Table-Button" disabled={loading} className="w-full bg-[#1D1F24]" type="submit">
                {loading ? 'Шинэчилж  байна...' : 'Шинэчлэх'}
              </Button>
            </form>
          </Form>
        }
      />
    </Dialog>
  );
};
