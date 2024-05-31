import React from 'react';
import { IoSend } from 'react-icons/io5';
type RouterType = {
  onClick?: () => void;
};
const CreateCommentButton = ({ onClick }: RouterType) => {
  return (
    <button onClick={onClick} data-testid="create-comment-button-test-id">
      <IoSend className="w-[20px] h-[20px]" />
    </button>
  );
};

export default CreateCommentButton;
