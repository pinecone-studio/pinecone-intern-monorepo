'use client';

import { Button } from '@/components/ui/button';
import { useDeleteEventMutation } from '@/generated';
import { Trash } from 'lucide-react';
import { Snackbar, CircularProgress } from '@mui/material';
import { useState } from 'react';

const DeleteConcertButton = ({ idx, id }: { idx: number; id: string }) => {
  const [deleteEvent, { loading, error }] = useDeleteEventMutation();
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent({
        variables: { deleteEventId: id },
        refetchQueries: ['concerts'],
      });
      setSuccessOpen(true);
    } catch (e) {
      setErrorOpen(true);
    }
  };

  return (
    <>
      <Button onClick={() => handleDelete(id)} variant="ghost" size="icon" title="Устгах" data-testid={`delete-btn-${idx}`} disabled={loading}>
        {loading ? <CircularProgress size={18} thickness={5} /> : <Trash className="h-4 w-4 hover:text-red-500" />}
      </Button>

      <Snackbar open={loading} message="Түр хүлээнэ үү..." anchorOrigin={{ vertical: 'top', horizontal: 'center' }} />
      <Snackbar open={successOpen} autoHideDuration={2000} onClose={() => setSuccessOpen(false)} message="Амжилттай устгалаа!" anchorOrigin={{ vertical: 'top', horizontal: 'center' }} />
      <Snackbar open={errorOpen} autoHideDuration={3000} onClose={() => setErrorOpen(false)} message={error?.message || 'Алдаа гарлаа'} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} />
    </>
  );
};

export default DeleteConcertButton;
