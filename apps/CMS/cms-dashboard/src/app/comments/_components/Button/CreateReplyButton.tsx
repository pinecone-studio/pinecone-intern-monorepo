import { IoSend } from 'react-icons/io5';
type RouterType = {
  onClick?: () => void;
};
const CreateReplyButton = ({ onClick }: RouterType) => {
  return (
    <button onClick={onClick} data-testid="create-reply-button-test-id">
      <IoSend className="w-[20px] h-[20px] group-hover:text-white" />
    </button>
  );
};

export default CreateReplyButton;
