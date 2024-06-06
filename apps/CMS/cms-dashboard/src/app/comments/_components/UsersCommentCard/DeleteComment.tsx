import { User, useDeleteCommentMutation } from '@/generated';
import { useApolloClient } from '@apollo/client';
import { toast } from 'react-toastify';
import { PiTrashSimpleBold } from 'react-icons/pi';
import jwt from 'jsonwebtoken';

type DeleteReplyProps = {
  id?: string | undefined | null;
  refetch: () => void;
};

const DeleteComment = (props: DeleteReplyProps) => {
  const { id, refetch } = props;
  const token = localStorage.getItem('token')!;
  const user = jwt.decode(token) as User;
  const client = useApolloClient();
  const [deleteComment] = useDeleteCommentMutation({ client });
  const HandleDeleteComment = async () => {
    if (user?.id && id) {
      await deleteComment({ variables: { deleteInput: { _id: user?.id && id } } });
      toast.success('Сэтгэгдэл амжилттай устгагдлаа.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
      refetch();
    }
  };
  return (
    <button onClick={HandleDeleteComment} id="delete-comment-button-test-id" className="flex justify-center items-center gap-2 self-end">
      <PiTrashSimpleBold className="h-[20px] w-[20px]" id="delete-comment-button-test-id" />
      Устгах
    </button>
  );
};

export default DeleteComment;
