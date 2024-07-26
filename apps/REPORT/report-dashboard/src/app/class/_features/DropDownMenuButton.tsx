import DeleteTab from '@/components/svg/DeleteTab';
import EditTab from '@/components/svg/EditTab';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useDeleteClassMutation, useGetClassesQuery } from '@/generated';
import { MoreHorizontal } from 'lucide-react';

interface DropDownMenuButtonProps {
  classId?: string | null;
}

const DropDownMenuButton = ({ classId }: DropDownMenuButtonProps) => {
  const [deleteClass] = useDeleteClassMutation();
  const { refetch } = useGetClassesQuery();

  const handleDelete = async () => {
    try {
      if (classId) {
        await deleteClass({ variables: { classId } });
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="w-[24px] h-[24px] flex items-center justify-center absolute top-[8px] right-[8px]"
      data-testid="dropdown-menu-button"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <DropdownMenu data-testid="dropdown-menu">
        <DropdownMenuTrigger asChild className="invisible group-hover:visible" data-testid="more-horizontal-button">
          <Button variant={'ghost'} className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" data-testid="more-horizontal-icon" />
          </Button>
        </DropdownMenuTrigger>
        <div className="w-full h-full" data-testid="dropdown-menu-content">
          <DropdownMenuContent align="end" className="gap-[2px]">
            <DropdownMenuItem className="gap-[8px]" data-testid="edit-menu-item">
              <EditTab data-testid="edit-svg" />
              <p className="text-sm text-black font-normal leading-5">Засах</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleDelete();
              }}
              className="gap-[8px]"
              data-testid="delete-menu-item"
            >
              <DeleteTab />
              <p className="text-sm text-black font-normal leading-5">Устгах</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </div>
  );
};

export default DropDownMenuButton;
