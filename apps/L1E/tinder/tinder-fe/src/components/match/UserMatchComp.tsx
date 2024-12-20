'use client';

import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

type MatchDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  userImage: string;
  matchImage: string;
  matchName: string;
};

export const UserMatchComp = ({ userImage, matchImage, matchName, isOpen, onClose }: MatchDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="max-w-[440px] p-0 gap-0">
        <div className="p-6 relative bg-white rounded-lg">
          <button onClick={onClose} data-testid="CloseBtn" className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold tracking-tight">It&apos;s a Match!</h1>
            <div className="flex justify-center -space-x-4">
              <div className="relative w-32 h-32">
                <img src={userImage} alt="Your profile" className="absolute w-full h-full rounded-full object-cover border-4 border-gray-200" />
              </div>
              <div className="relative w-32 h-32">
                <img src={matchImage} alt="Match profile" className="absolute w-full h-full rounded-full object-cover border-4 border-gray-200" />
              </div>
            </div>
            <p className="text-center text-xl">You matched with {matchName}</p>
            <div className="space-y-4">
              <Input placeholder="Say something nice" className="w-full" />
              <Button className="w-full bg-rose-500 hover:bg-rose-600">
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
