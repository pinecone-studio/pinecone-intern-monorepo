import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import Image from 'next/image';

const items = [
  { image: '/images/profilePic.png', username: 'odshgdflk', lastname: 'dshgk' },
  { image: '/images/profilePic.png', username: 'odshgdflk', lastname: 'dshgk' },
  { image: '/images/profilePic.png', username: 'odshgdflk', lastname: 'dshgk' },
  { image: '/images/profilePic.png', username: 'odshgdflk', lastname: 'dshgk' },
  { image: '/images/profilePic.png', username: 'odshgdflk', lastname: 'dshgk' },
  { image: '/images/profilePic.png', username: 'odshgdflk', lastname: 'dshgk' },
  { image: '/images/profilePic.png', username: 'odshgdflk', lastname: 'dshgk' },
];
const Followers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[425px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div></div>
            <h3 className="flex justify-center ">Followers</h3>
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
            <Input id="search" placeholder="Search" className="col-span-3 h-8 pl-8" />
          </div>
        </div>
        <div className="flex flex-col gap-3 overflow-y-scroll">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between ">
              <div className=" flex gap-4">
                <Image src={item.image} alt="zurag" width={50} height={50} className=" object-cover rounded-full bg-red-700" />
                <div>
                  <p className="text-sm font-medium">{item.lastname}</p>
                  <p className="text-xs font-normal text-[#71717A]">{item.username}</p>
                </div>
              </div>
              <button className="py-2 px-4 bg-slate-200 rounded-lg text-sm font-medium ">Remove</button>
            </div>
          ))}
        </div>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Followers;
