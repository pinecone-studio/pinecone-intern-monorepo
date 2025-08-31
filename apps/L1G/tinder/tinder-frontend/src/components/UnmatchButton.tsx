'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useUnmatchMutation } from '@/generated';

type UnmatchButtonProps = {
  matchId: string | undefined;
  onUnmatched?: () => void;
};

const UnmatchButton: React.FC<UnmatchButtonProps> = ({ matchId, onUnmatched }) => {
  const router = useRouter();

  const [unmatch, { loading }] = useUnmatchMutation({
    variables: { matchId: matchId ?? '' },
    onCompleted: (data) => {
      if (data.unmatch?.success) {
        onUnmatched?.();
      } else {
        alert(data.unmatch?.message);
      }
    },
    onError: (error) => {
      console.error('Unmatch error:', error);
      alert('Something went wrong. Please try again.');
    },
  });
  if (matchId == undefined) {
    console.warn('UnmatchButton: matchId is undefined, button will not render.');
    return null;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[112px] h-[40px] text-sm font-medium bg-white border hover:bg-gray-100">
          Unmatch
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>Unmatch this person?</DialogTitle>
          <DialogDescription>If you unmatch, you will not be able to chat with this person again. This action cannot be undone.</DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-between gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-full hover:bg-[#E11D48E5] hover:text-white border" onClick={() => router.push('/chat')}>
              Keep match
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button variant="outline" className="rounded-full hover:bg-[#E11D48E5] hover:text-white border" onClick={() => unmatch()} disabled={loading}>
              {loading ? 'Unmatching...' : 'Unmatch'}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UnmatchButton;
