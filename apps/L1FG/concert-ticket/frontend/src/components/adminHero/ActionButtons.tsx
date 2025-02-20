import { Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
export const ActionButtons = () => (
  <div className="flex space-x-2">
    <Button className="p-1 bg-[#F4F4F6]">
      <Pencil className="text-black" />
    </Button>
    <Button className="p-1 bg-[#F4F4F6]">
      <Trash className="text-black" />
    </Button>
  </div>
);
