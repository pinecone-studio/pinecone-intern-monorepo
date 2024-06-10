import { User } from '@/generated';
import jwt from 'jsonwebtoken';
import NotSignedUserReply from './NotSignedUserReply';
import SignedUserReply from './SignedUserReply';

type CommentsProps = {
  id?: string | undefined | null;
  reply?: string;
  name?: string;
  onReplySubmitted: () => void;
};

const ReplyComment = (props: CommentsProps) => {
  const { id, reply, name, onReplySubmitted } = props;
  const token = localStorage.getItem('token')!;
  const user = jwt.decode(token) as User;

  if (user) {
    return <SignedUserReply id={id} reply={reply} onReplySubmitted={onReplySubmitted} />;
  }

  return <NotSignedUserReply id={id} reply={reply} name={name} />;
};

export default ReplyComment;
