'use client';
import { Button } from '@/components/ui/button';
import { useDeleteEventMutation } from '@/generated';
import { Trash } from 'lucide-react';
import { Snackbar } from '@mui/material';

const DeleteConcertButton = ({ idx, id }: { idx: number; id: string }) => {
  const [deleteEvent, { error, loading }] = useDeleteEventMutation();

  const handleDelete = async (id: string) => {
    await deleteEvent({
      variables: { deleteEventId: id },
      refetchQueries: ['concerts'],
    });
  };
  return (
    <Button
      onClick={() => {
        handleDelete(id);
      }}
      variant="ghost"
      size="icon"
      title="Устгах"
      data-testid={`delete-btn-${idx}`}
    >
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={loading} message="Түр хүлээнэ үү!" />
      <Snackbar autoHideDuration={500} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={!!error} message={error?.message} />
      <Trash className="h-4 w-4 hover:text-red-500" />
    </Button>
  );
};

export default DeleteConcertButton;
