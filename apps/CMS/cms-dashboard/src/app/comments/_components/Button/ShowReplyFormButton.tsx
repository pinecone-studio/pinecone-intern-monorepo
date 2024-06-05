import { FaReply } from 'react-icons/fa';

type RouterType = {
  onClick?: () => void;
};
const ShowReplyForm = ({ onClick }: RouterType) => {
  return (
    <button onClick={onClick} data-testid="show-reply-form-button-test-id">
      <FaReply /> Хариулах
    </button>
  );
};

export default ShowReplyForm;
