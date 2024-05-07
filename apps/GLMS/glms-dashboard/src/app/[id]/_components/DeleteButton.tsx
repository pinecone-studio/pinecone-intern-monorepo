'use client';
import { DeleteIcon } from '../../../../public/assets/DeleteIcon';

type DeleteButtonProps = {
  onClick?: () => void;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="btn btn-ghost w-14 h-14 p-4 border border-[#D6D8DB] rounded-md cursor-pointer " data-testid="delete-button-test-id">
      <DeleteIcon />
    </button>
  );
};

export default DeleteButton;
