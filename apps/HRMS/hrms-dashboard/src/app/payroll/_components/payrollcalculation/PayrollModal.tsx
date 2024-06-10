import { Button } from '../../../../shadcn/Button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../../../shadcn/Dialog';

import { FaPlus } from 'react-icons/fa6';
import { StartDate } from './StartDate';
import { LastDate } from './LastDate';

export function PayrollModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button data-testid="calculateBtn" variant="default" className="flex gap-2 items-center justify-center">
          Цалин бодох <FaPlus />
        </Button>
      </DialogTrigger>
      <DialogContent data-testid="modalContent" className="sm:max-w-[546px] py-16 px-12">
        <DialogHeader className="flex items-center">
          <DialogTitle data-testid="title" className="text-2xl pr-8">
            Цалингийн мэдээлэл үүсгэх
          </DialogTitle>
        </DialogHeader>
        <div className="gap-4 py-4 flex w-full">
          <StartDate />
          <LastDate />
        </div>
        <DialogFooter className="pr-3">
          <Button data-testid="SubmitBtn" type="submit" className="w-[450px] h-14 bg-[#2C2E33]">
            Цалин бодох
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
