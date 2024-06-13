import { Button } from '@/components/ui/button';
import { MdOutlineAdd } from 'react-icons/md';
export const AddEmployee = () => {
  return (
    <div data-testid="container" className="flex justify-between w-[1154px] py-5 px-6 ">
      <h1 className="text-2xl font-bold not-italic ">Ажилчид</h1>
      <Button data-testid="addButton" variant={'secondary'}>
        <MdOutlineAdd className="w-5 h-5" />
        Ажилтан нэмэх
      </Button>
    </div>
  );
};
