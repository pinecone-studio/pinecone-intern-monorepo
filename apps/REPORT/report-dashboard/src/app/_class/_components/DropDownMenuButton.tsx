import DeleteTab from '@/components/svg/DeleteTab';
import EditTab from '@/components/svg/EditTab';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

const DropDownMenuButton = () => {
  return (
    <div className="w-[24px] h-[24px] flex items-center justify-center absolute top-[8px] right-[8px]" data-testid="dropdown-menu-button">
      <DropdownMenu data-testid="dropdown-menu-button">
        <DropdownMenuTrigger asChild className="invisible group-hover:visible">
          <Button variant={'ghost'} className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" data-testid="more-horizontal-icon" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="gap-[2px]" data-testid="dropdown-menu-content">
          <DropdownMenuItem className="gap-[8px]">
            <EditTab />
            <p className="text-sm text-black font-normal leading-5">Засах</p>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-[8px]">
            <DeleteTab />
            <p className="text-sm text-black font-normal leading-5">Устгах</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropDownMenuButton;
