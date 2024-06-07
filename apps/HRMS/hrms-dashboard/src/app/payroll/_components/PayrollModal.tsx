import { Button } from '../../../shadcn/Button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../../shadcn/Dialog';

import { FaPlus } from 'react-icons/fa6';
import { PayrollCalender1 } from './PayrollCal1';
import { PayrollCalender2 } from './PayrollCal2';

export function PayrollModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="flex gap-2 items-center justify-center">
          Цалин бодох <FaPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[546px] py-16 px-12">
        <DialogHeader className="flex items-center">
          <DialogTitle className="text-2xl">Цалингийн мэдээлэл үүсгэх </DialogTitle>
        </DialogHeader>
        <div className="gap-4 py-4 flex w-full">
          <PayrollCalender1 />
          <PayrollCalender2 />
        </div>
        <DialogFooter className="pr-3">
          <Button type="submit" className="w-[450px] h-14 bg-[#2C2E33]">
            Цалин бодох
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
