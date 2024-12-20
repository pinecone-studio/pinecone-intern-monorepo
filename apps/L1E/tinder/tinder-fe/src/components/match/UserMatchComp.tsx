'use client';

import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

type MatchDialogProps = {
  isOpen: boolean;
  userImage: string;
  matchImage: string;
  matchName: string;
};

export const UserMatchComp = ({ userImage, matchImage, matchName, isOpen }: MatchDialogProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-[440px] p-0 gap-0">
        <div className="p-6 relative bg-white rounded-lg">
          <button className="absolute right-4 top-4 rounded-sm opacity-70 ">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold tracking-tight">Its a Match</h1>
            <div className="flex justify-center -space-x-4">
              <div className="relative w-32 h-32">
                <img src={userImage} alt="" className="absolute w-full h-full rounded-full object-cover border-4 border-gray-200" />
              </div>
              <div className="relative w-32 h-32">
                <img src={matchImage} alt="" className="absolute w-full h-full rounded-full object-cover border-4 border-gray-200" />
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
