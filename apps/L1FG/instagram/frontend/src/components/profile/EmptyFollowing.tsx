import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

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
        <div className="w-full border"></div>
        <div className="flex justify-center">
          <div className="items-center justify-center w-full relative">
            <Search className="absolute top-1 left-2 text-gray-500" />
            <Input id="search" placeholder="Search" className="col-span-3 h-8 pl-8  rounded-xl " />
          </div>
        </div>
        <div className="flex flex-col gap-10 overflow-y-scroll items-center justify-center ">
          <div className="rounded-full border-2 border-black flex justify-center items-center h-28 w-28 mt-7">
            <UserPlus className="w-14 h-14" />
          </div>
          <div className="text-center flex flex-col gap-4">
            <p className="text-2xl font-semibold">Followers</p>
            <p>You ll see all of the people who follow you here.</p>
          </div>
        </div>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default EmptyFollowing;
