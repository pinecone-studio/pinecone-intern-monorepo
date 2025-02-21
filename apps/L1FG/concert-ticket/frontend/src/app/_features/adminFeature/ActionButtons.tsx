/*eslint-disable*/
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Concert } from '@/components/adminfeature/concert-type';

import { useDeleteConcertMutation, useEditConcertMutation, useGetConcertsQuery } from '@/generated';
import type { EditConcertInput } from '@/generated';
import { EditFormData } from '@/components/adminfeature/concert-type';
import EditConcertDialog from './EditDialog';
import { toast } from '@/components/ui/use-toast';

interface ActionButtonsProps {
  concert: Concert;
}

export const ActionButtons = ({ concert }: ActionButtonsProps) => {
  const [deleteConcert] = useDeleteConcertMutation();
  const { refetch } = useGetConcertsQuery();
  const [editConcert] = useEditConcertMutation();

  const handleEdit = async (formData: EditFormData) => {
    try {
      const vipTicket = {
        price: formData.vipTicket.price,
        quantity: formData.vipTicket.quantity,
      };

      const regularTicket = {
        price: formData.regularTicket.price,
        quantity: formData.regularTicket.quantity,
      };

      const standingAreaTicket = {
        price: formData.standingAreaTicket.price,
        quantity: formData.standingAreaTicket.quantity,
      };

      const formattedDate = formData.concertDay instanceof Date ? formData.concertDay.toISOString().split('T')[0] : String(formData.concertDay);

      const editConcertInput: EditConcertInput = {
        id: concert._id,
        concertName: formData.concertName,
        concertDay: formattedDate,
        concertPlan: formData.concertPlan,
        artists: formData.artistName.filter((name): name is string => name !== null),
        concertTime: formData.concertTime,
        vipTicket,
        regularTicket,
        standingAreaTicket,
      };

      await editConcert({
        variables: { input: editConcertInput },
        onCompleted: () => {
          toast({ title: 'Амжилттай', description: 'Тасалбар амжилттай засагдлаа' });
          refetch();
        },
        onError: (error) => {
          toast({ title: `Error: ${error.message}` });
        },
      });
    } catch (error) {
      console.error('Error editing concert:', error);
      throw error;
    }
  };

  const handleDelete = async () => {
    try {
      await deleteConcert({
        variables: { id: concert._id },
        onCompleted: () => {
          toast({ title: 'Амжилттай', description: 'Амжилттай устгагдлаа!' });
          refetch();
        },
        onError: (error) => {
          toast({
            title: 'Алдаа гарлаа',
          });
        },
      });
    } catch (error) {
      console.error('Error deleting concert:', error);
    }
  };

  return (
    <div className="flex space-x-2">
      <EditConcertDialog
        concert={{
          ...concert,
          concertDay: concert.concertDay || '',
          artistName: (concert.artistName ?? []).filter((name): name is string => name !== null),
          vipTicket: { price: concert.vipTicket?.price ?? 0, quantity: concert.vipTicket?.quantity ?? 0 },
          regularTicket: { price: concert.regularTicket?.price ?? 0, quantity: concert.regularTicket?.quantity ?? 0 },
          standingAreaTicket: {
            price: concert.standingAreaTicket?.price ?? 0,
            quantity: concert.standingAreaTicket?.quantity ?? 0,
          },
        }}
        onEdit={handleEdit}
      />
      <Button onClick={handleDelete} className="p-1 bg-[#F4F4F6]">
        <Trash className="text-black" />
      </Button>
    </div>
  );
};
