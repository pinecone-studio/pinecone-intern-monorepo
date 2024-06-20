import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MdOutlineAdd } from 'react-icons/md';
import { IoArrowForwardSharp } from 'react-icons/io5';
import { Stepper } from './Stepper';
export const AddModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          data-testid="addEmployeeBtn"
          className="bg-[#F7F7F8] text-[#121316] hover:bg-gray-200 duration-600 ease-in-out h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          <MdOutlineAdd data-testid="add-icon" className="w-5 h-5" />
          Ажилтан нэмэх
        </Button>
      </DialogTrigger>
      <DialogContent data-testid="modalContent" className="flex gap-10 flex-col sm:max-w-[620px] px-8">
        <DialogHeader>
          <DialogTitle data-testid="title">Ажилтан нэмэх</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Stepper currentStep={0} />
        <DialogFooter>
          <Button
            className=" gap-2 bg-[#D6D8DB] ease-in-out hover:bg-gray-200 hover:text-black h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-[#1C20243D]  duration-600"
            data-testid="SubmitBtn"
            type="submit"
          >
            Дараах <IoArrowForwardSharp data-testid="arrow-icon" className="w-4 h-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
