'use client';

import { EditButtonIcon } from '../../../../public/assets/EditButtonicon';

type EditButtonProps = {
  onClick?: () => void;
};

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-ghost w-14 h-14 p-4 border border-[#D6D8DB] dark:hover:bg-[#3d3d3def] dark:border-[#515151]  dark:bg-[#4a4a4a] rounded-md cursor-pointer "
      data-testid="edit-button-test-id"
      data-cy="lesson-edit-button-test-id"
    >
      <EditButtonIcon />
    </button>
  );
};

export default EditButton;
