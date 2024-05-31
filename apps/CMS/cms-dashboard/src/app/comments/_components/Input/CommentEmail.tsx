import { Comment } from '@/generated';

const CommentEmail = ({ email }: Comment) => {
  return (
    <p className="font-extrabold" data-testid="comment-email-test-id">
      {email}
    </p>
  );
};

export default CommentEmail;
