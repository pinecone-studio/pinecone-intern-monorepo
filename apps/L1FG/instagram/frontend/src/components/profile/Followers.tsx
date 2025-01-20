import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

const Followers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[425px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div></div>
            <h3 className="flex justify-center">Following</h3>
            <div className="flex justify-end">
              <DialogTrigger asChild>
                <button aria-label="Close dialog">
                  <X className="cursor-pointer" />
                </button>
              </DialogTrigger>
            </div>
          </div>
        </DialogHeader>
        <div className="w-full border"></div>
        <div className="flex justify-center">
          <div className="items-center justify-center w-full relative">
            <Search className="absolute top-2 left-2 text-gray-500" />
            <Input id="search" placeholder="Search" className="col-span-3 h-8 pl-8" />
          </div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Followers;
