'use client';

import { PiTrashSimpleBold } from 'react-icons/pi';

type DeleteCommentButtonProps = {
  onClick?: () => void;
};

const DeleteCommentButton: React.FC<DeleteCommentButtonProps> = ({ onClick }) => {
  return (
    <button data-testid="delete-comment-button-test-id" onClick={onClick}>
      <PiTrashSimpleBold className="h-[20px] w-[20px]" />
    </button>
  );
};

export default DeleteCommentButton;
