import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { Search, UserPlus, X } from 'lucide-react';

const EmptyFollowing = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[425px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div></div>
            <h3 className="flex justify-center ">Following</h3>
            <div className="flex justify-end">
              <DialogTrigger asChild>
                <div className="relative">
                  <p aria-label="Close dialog absolute">
                    <X className="cursor-pointer" />
                  </p>
                </div>
              </DialogTrigger>
            </div>
          </div>
        </DialogHeader>
        <Separator className="w-full" />
        <div className="flex justify-center">
          <div className="items-center justify-center w-full relative">
            <Search className="absolute top-1 left-2 text-gray-500" />
            <Input id="search" placeholder="Search" className="col-span-3 h-8 pl-8  rounded-xl " />
          </div>
        </div>
        <div className="flex flex-col gap-5 overflow-y-scroll items-center justify-center ">
          <div className="rounded-full border-2 border-black flex justify-center items-center h-24 w-24 mt-5">
            <UserPlus className="w-14 h-14" />
          </div>
          <div className="text-center flex flex-col gap-2">
            <p className="text-2xl font-semibold">Following</p>
            <p>You ll see all of the people who follow you here.</p>
          </div>
        </div>

        <p className="font-semibold text-lg justify-start mt-6">Suggested for you</p>
      </DialogContent>
    </Dialog>
  );
};
export default EmptyFollowing;
