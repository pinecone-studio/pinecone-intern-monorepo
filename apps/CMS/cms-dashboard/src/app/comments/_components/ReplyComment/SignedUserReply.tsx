import { User, useDeleteReplyMutation, useGetRepliesByCommentIdQuery } from '@/generated';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { FaReply } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import { PiTrashSimpleBold } from 'react-icons/pi';
import jwt from 'jsonwebtoken';
import { useApolloClient } from '@apollo/client';
import { toast } from 'react-toastify';
import { useState } from 'react';
import CreateReply from './CreateReply';
import ReplyComment from '.';

type SignedReplyProps = {
  id?: string | undefined | null;
  reply?: string;
  onReplySubmitted: () => void;
};

const SignedUserReply = (props: SignedReplyProps) => {
  const { id, reply, onReplySubmitted } = props;
  const token = localStorage.getItem('token')!;
  const user = jwt.decode(token) as User;
  const client = useApolloClient();
  const [deleteReply] = useDeleteReplyMutation({ client });
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { data, refetch: refetchReplies } = useGetRepliesByCommentIdQuery({ variables: { commentId: id! } });
  const replyComments = data?.getRepliesByCommentId || [];

  const handleReplySubmitted = () => {
    refetchReplies();
    setShowReplyForm(false);
  };
  const HandleDeleteReply = async () => {
    if (user?.id && id) {
      await deleteReply({ variables: { deleteInput: { _id: user?.id && id } } });
      toast.success('Сэтгэгдэл амжилттай устгагдлаа.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
      onReplySubmitted();
    }
  };

  return (
    <div>
      <div className="p-[32px] rounded-2xl ">
        <div className="items-stretch">
          <div>
            <div>
              <h1 className="text-[20px] font-bold">Таны сэтгэгдэл</h1>
              <p className="text-[18px] font-normal mt-2">{reply}</p>
            </div>
          </div>
          <div className="justify-between grid grid-cols-2 h-[60px]">
            <div className="flex gap-[16px]">
              <button id="edit-comment-button-test-id" className="flex justify-center items-center gap-2 self-end">
                <MdOutlineEdit className="h-[20px] w-[20px]" />
                Засах
              </button>
              <button onClick={HandleDeleteReply} id="delete-reply-button-test-id" className="flex justify-center items-center gap-2 self-end">
                <PiTrashSimpleBold className="h-[20px] w-[20px]" />
                Устгах
              </button>
            </div>
            <div className="flex gap-[16px] justify-end">
              <button className="flex justify-center items-center gap-2 self-end">
                <AiOutlineLike className="h-[20px] w-[20px]" /> 0
              </button>
              <button className="flex justify-center items-center gap-2 self-end">
                <AiOutlineDislike className="h-[20px] w-[20px]" /> 0
              </button>
              <button id="show-reply-form-button-test-id" onClick={() => setShowReplyForm(!showReplyForm)} className="flex justify-center items-center gap-2 self-end">
                <FaReply /> Хариулах
              </button>
            </div>
          </div>
        </div>
      </div>
      {showReplyForm && <CreateReply commentId={id!} onReplySubmitted={handleReplySubmitted} />}
      {replyComments.map((item) => (
        <div key={item?._id}>{item?.reply && <ReplyComment onReplySubmitted={handleReplySubmitted} id={item._id} reply={item.reply} name={item.name ?? ''} />}</div>
      ))}
    </div>
  );
};

export default SignedUserReply;
