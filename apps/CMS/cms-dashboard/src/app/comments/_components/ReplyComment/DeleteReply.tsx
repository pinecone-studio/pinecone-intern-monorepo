import { User, useDeleteReplyMutation } from '@/generated';
import { useApolloClient } from '@apollo/client';
import React from 'react';
import { toast } from 'react-toastify';
import { PiTrashSimpleBold } from 'react-icons/pi';
import jwt from 'jsonwebtoken';

type DeleteReplyProps = {
  id?: string | undefined | null;
  onReplySubmitted: () => void;
};

const DeleteReply = (props: DeleteReplyProps) => {
  const { id, onReplySubmitted } = props;
  const token = localStorage.getItem('token')!;
  const user = jwt.decode(token) as User;
  const client = useApolloClient();
  const [deleteReply] = useDeleteReplyMutation({ client });
  const handleDeleteReply = async () => {
    if (user?.id && id) {
      await deleteReply({ variables: { deleteInput: { _id: id } } });
      toast.success('Сэтгэгдэл амжилттай устгагдлаа.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
      onReplySubmitted();
    }
  };
  return (
    <button onClick={handleDeleteReply} id="delete-reply-button-test-id" className="flex justify-center items-center gap-2 self-end">
      <PiTrashSimpleBold className="h-[20px] w-[20px]" />
      Устгах
    </button>
  );
};

export default DeleteReply;
