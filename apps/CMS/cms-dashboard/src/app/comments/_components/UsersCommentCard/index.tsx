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
  const { name, comment, refetch, id } = props;
  const token = localStorage.getItem('token')!;
  const user = jwt.decode(token) as User;

  if (user) {
    return <SignedUserComment refetch={refetch} comment={comment} id={id} />;
  }

  return <NotSignedUserComment name={name} comment={comment} id={id} />;
};

export default UserCommentCard;
