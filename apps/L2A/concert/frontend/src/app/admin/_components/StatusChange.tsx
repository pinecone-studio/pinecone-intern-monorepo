'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { IoIosClose } from 'react-icons/io';

const StatusChange = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-slate-500">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-end text-2xl">
            <IoIosClose />
          </div>
          <DialogTitle className="text-xl">Төлөв өөрчлөх</DialogTitle>
          <DialogDescription>“И.Алтангэрэл” харилцагчийн төлбөрийн буцаалтын шилжүүлсэн үү.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" className="w-[436px]">
            шилжүүлсэн
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default StatusChange;
