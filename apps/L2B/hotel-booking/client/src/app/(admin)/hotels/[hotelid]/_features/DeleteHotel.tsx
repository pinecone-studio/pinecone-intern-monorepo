'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDeleteHotelMutation } from '@/generated';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const DeleteHotel = ({ hotelId, refetch }: { hotelId: string; refetch: () => void }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [deleteHotel, { loading }] = useDeleteHotelMutation({
    variables: { deleteHotelId: hotelId },
    onCompleted: () => {
      refetch();
      setOpen(false);
      toast.success('Hotel deleted successfully');
      router.push('/hotels');
    },
    onError: (error) => {
      console.error('Failed to delete hotel:', error.message);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-full">
        <Button variant={'destructive'}>Delete Hotel</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px] w-full ">
        <DialogHeader>
          <DialogTitle>Hotel delete?</DialogTitle>
          <DialogDescription>This action cannot be undone. This will permanently delete the hotel and remove all associated data.</DialogDescription>
        </DialogHeader>
        <div className="w-full flex items-center justify-end gap-2 ">
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => deleteHotel()} disabled={loading} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white" variant={'destructive'}>
            {loading ? 'Deleting...' : 'Confirm Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
