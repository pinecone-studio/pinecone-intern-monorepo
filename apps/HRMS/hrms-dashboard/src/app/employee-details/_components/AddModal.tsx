import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MdOutlineAdd } from 'react-icons/md';
import { IoArrowForwardSharp } from 'react-icons/io5';
export const AddModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button data-testid="addEmployeeBtn" variant="secondary">
          <MdOutlineAdd data-testid="add-icon" className="w-5 h-5" />
          Ажилтан нэмэх
        </Button>
      </DialogTrigger>
      <DialogContent data-testid="modalContent" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle data-testid="title">Ажилтан нэмэх</DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <Button variant={'outline'} className="flex gap-2 text-[#1C20243D] bg-[#D6D8DB] duration-500" data-testid="SubmitBtn" type="submit">
            Дараах <IoArrowForwardSharp data-testid="arrow-icon" className="w-4 h-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
