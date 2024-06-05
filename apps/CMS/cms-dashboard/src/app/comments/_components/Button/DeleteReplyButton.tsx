'use client';

import { PiTrashSimpleBold } from 'react-icons/pi';

type DeleteReplyButtonProps = {
  onClick?: () => void;
};

const DeleteReplyButton: React.FC<DeleteReplyButtonProps> = ({ onClick }) => {
  return (
    <button data-testid="delete-reply-button-test-id" onClick={onClick}>
      <PiTrashSimpleBold className="h-[20px] w-[20px]" />
    </button>
  );
};

export default DeleteReplyButton;
