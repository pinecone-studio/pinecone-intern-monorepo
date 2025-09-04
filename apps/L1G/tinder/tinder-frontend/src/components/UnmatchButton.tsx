'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserX } from 'lucide-react';
import { useUnmatchMutation } from '@/generated';

type UnmatchButtonProps = {
  matchId: string | undefined;
  onUnmatched?: () => void;
};

const UnmatchButton: React.FC<UnmatchButtonProps> = ({ matchId, onUnmatched }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [unmatch, { loading }] = useUnmatchMutation({
    variables: { matchId: matchId ?? '' },
    onCompleted: (data) => {
      if (data.unmatch?.success) {
        setOpen(false);
        onUnmatched?.();
        router.push('/chat');
      } else {
        console.error(data.unmatch?.message);
      }
    },
    onError: (error) => {
      console.error('Unmatch error:', error);
    },
  });

  if (!matchId) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button data-testid="unmatch-dialog-trigger" className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 transition-colors">
          <UserX size={18} className="text-red-500" />
          <span className="font-medium">Unmatch</span>
        </button>
      </DialogTrigger>

      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>Unmatch this person?</DialogTitle>
          <DialogDescription>If you unmatch, you will not be able to chat with this person again. This action cannot be undone.</DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-between gap-2">
          <Button variant="outline" className="rounded-full hover:bg-gray-100 bg-transparent" onClick={() => setOpen(false)}>
            Keep match
          </Button>

          <Button data-testid="unmatch-trigger" variant="destructive" className="rounded-full" onClick={() => unmatch()} disabled={loading}>
            {loading ? 'Unmatching...' : 'Unmatch'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UnmatchButton;
 