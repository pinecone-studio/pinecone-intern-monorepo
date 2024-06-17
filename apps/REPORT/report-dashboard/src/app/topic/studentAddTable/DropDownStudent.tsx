import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../../../components/ui/dropdown-menu';
import { FiEdit } from 'react-icons/fi';
import { LuDelete } from 'react-icons/lu';

export const DropDownStudent = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" text-2xl">...</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2">
          <FiEdit />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2">
          <LuDelete />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
