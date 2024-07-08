import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SectionButton = () => {
  return (
    <Button className="w-[200px] h-[40px] bg-[#121316] rounded-[8px] flex justify-center items-center border-solid border-[#B6B8BD ] border-[1px] ">
      <Plus />
    </Button>
  );
};
