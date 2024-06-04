import { User, useDeleteCommentMutation } from '@/generated';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { FaReply } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import { PiTrashSimpleBold } from 'react-icons/pi';
import jwt from 'jsonwebtoken';
import { useApolloClient } from '@apollo/client';
import { toast } from 'react-toastify';

type CommentsProps = {
  comment?: string;
  id?: string | undefined | null;
  refetch: () => void;
};

const SignedUserComment = (props: CommentsProps) => {
  const { comment, id, refetch } = props;
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
    <div className="p-[32px] bg-white rounded-2xl  mt-6 ">
      <div className="items-stretch">
        <div>
          <div>
            <h1 className="text-[20px] font-bold">Таны сэтгэгдэл</h1>
            <p className="text-[18px] font-normal mt-2">{comment}</p>
          </div>
        </div>
        <div className=" justify-between  grid grid-cols-2 h-[60px]">
          <div className="flex gap-[16px] ">
            <button className="flex justify-center items-center gap-2 self-end">
              <MdOutlineEdit className="h-[20px] w-[20px]" />
              Засах
            </button>
            <button onClick={HandleDeleteComment} id="delete-comment-button-test-id" className="flex justify-center items-center gap-2 self-end">
              <PiTrashSimpleBold className="h-[20px] w-[20px]" id="delete-comment-button-test-id" />
              Устгах
            </button>
          </div>
          <div className="flex gap-[16px] justify-end">
            <button className="flex justify-center items-center gap-2 self-end">
              <AiOutlineLike className="h-[20px] w-[20px]" /> 0
            </button>
            <button className="flex justify-center items-center gap-2 self-end">
              <AiOutlineDislike className="h-[20px] w-[20px]" />0
            </button>
            <button className="flex justify-center items-center gap-2 self-end">
              <FaReply /> Хариулах
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignedUserComment;
