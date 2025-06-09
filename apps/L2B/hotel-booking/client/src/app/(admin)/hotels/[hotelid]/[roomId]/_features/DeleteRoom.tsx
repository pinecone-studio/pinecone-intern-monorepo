'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useDeleteRoomMutation } from '@/generated';

export const DeleteRoom = ({ roomId, hotelId, refetch }: { roomId: string; hotelId: string | null | undefined; refetch: () => void }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [deleteRoom, { loading }] = useDeleteRoomMutation({
    variables: { deleteRoomId: roomId },
    onCompleted: () => {
      refetch();
      setOpen(false);
      toast.success('Room deleted successfully');
      router.push(`/hotels/${hotelId}`);
    },
    onError: (error) => {
      console.error('Failed to delete room:', error.message);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-full">
        <Button variant={'destructive'}>Delete Room</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px] w-full ">
        <DialogHeader>
          <DialogTitle>Room delete?</DialogTitle>
          <DialogDescription>This action cannot be undone. This will permanently delete the room and remove all associated data.</DialogDescription>
        </DialogHeader>
        <div className="w-full flex items-center justify-end gap-2 ">
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button data-cy="delete-room-button" onClick={() => deleteRoom()} disabled={loading} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white" variant={'destructive'}>
            {loading ? 'Deleting...' : 'Confirm Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
