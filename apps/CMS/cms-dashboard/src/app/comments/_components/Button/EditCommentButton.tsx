'use client';

import { MdOutlineEdit } from 'react-icons/md';

type EditButtonProps = {
  onClick?: () => void;
};

const EditCommentButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className=" " data-testid="edit-comment-button-test-id">
      <MdOutlineEdit className="h-[20px] w-[20px]" />
    </button>
  );
};

export default EditCommentButton;
