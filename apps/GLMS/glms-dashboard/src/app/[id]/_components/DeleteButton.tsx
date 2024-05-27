'use client';
import { DeleteIcon } from '../../../../public/assets/DeleteIcon';

type DeleteButtonProps = {
  onClick?: () => void;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button
      data-testid="delete-button-test-id"
      cy-data="delete-button-cy-test"
      onClick={onClick}
      className="btn btn-ghost w-14 h-14 p-4 border border-[#D6D8DB] dark:hover:bg-[#3d3d3def] dark:border-[#515151]  dark:bg-[#4a4a4a] rounded-md cursor-pointer "
    >
      <DeleteIcon />
    </button>
  );
};

export default DeleteButton;
