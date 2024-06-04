import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { FaReply } from 'react-icons/fa';
import jwt from 'jsonwebtoken';
import { User } from '@/generated';
import NotSignedUserComment from './NotSignedUserComment';
import SignedUserComment from './SignedUserComment';

type CommentsProps = {
  name?: string;
  comment?: string;
  email?: string | undefined | null;
  id?: string | undefined | null;
  refetch: () => void;
};

const UserCommentCard = (props: CommentsProps) => {
  const { name, comment, email, refetch, id } = props;
  const token = localStorage.getItem('token')!;
  const user = jwt.decode(token) as User;

  if (user && email === user.email) {
    return <SignedUserComment refetch={refetch} comment={comment} id={id} />;
  }
  if (user && email !== user.email) {
    return <NotSignedUserComment name={name} comment={comment} />;
  }

  return (
    <div className="p-[32px] bg-white rounded-2xl  mt-6 ">
      <div className="items-stretch">
        <div>
          <div>
            <h1 className="text-[20px] font-bold">{name}</h1>
            <p className="text-[18px] font-normal mt-2">{comment}</p>
          </div>
        </div>
        <div className=" justify-between  grid grid-cols-2 h-[60px]">
          <div className="flex gap-[16px] justify-start">
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

export default UserCommentCard;
