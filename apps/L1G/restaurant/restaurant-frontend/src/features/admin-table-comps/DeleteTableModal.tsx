'use client';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogContainer } from '../../components/table/DialogContainer';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { GetTablesQuery, useDeleteTableMutation } from '@/generated';
import { useState } from 'react';
import { toast } from 'sonner';
import { ApolloQueryResult } from '@apollo/client';

type DeleteTableModalProps = {
  refetch: () => Promise<ApolloQueryResult<GetTablesQuery>>;
  data: string;
};
export const DeleteTableModal = ({ data, refetch }: DeleteTableModalProps) => {
  const [DeleteTable, { loading }] = useDeleteTableMutation();
  const [open, setOpen] = useState(false);
  const HandleDeleteQr = async () => {
    try {
      await DeleteTable({
        variables: {
          tableId: data,
        },
      });

      refetch();

      toast.success('Ширээ амжилттай устгагдлаа');

      setOpen(false);
    } catch (error) {
      setOpen(false);
      toast.error('Амжилтгүй');
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger data-cy="Admin-Delete-Table-Dialog-Trigger" className="bg-[#F4F4F5] text-[14px] rounded-md flex w-[36px] h-[36px] justify-center items-center">
        <Trash className="w-[13.22px] h-[13.22px]" />
      </DialogTrigger>
      <DialogContainer
        title="Устгах"
        content={
          <div className="flex flex-col gap-2">
            <p className="text-[14px] text-[#71717A]">Устгахдаа итгэлтэй байна уу</p>
            <Button data-cy="Admin-Delete-Table-Button" disabled={loading} onClick={() => HandleDeleteQr()} className="w-full bg-[#1D1F24]">
              {loading ? 'Устгаж байна...' : ' Устгах'}
            </Button>
          </div>
        }
      />
    </Dialog>
  );
};
