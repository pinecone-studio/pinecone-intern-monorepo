import { Comment } from '@/generated';

const AuthorComment = ({ comment }: Comment) => {
  return (
    <p className="font-extrabold" data-testid="comment-test-id">
      {comment}
    </p>
  );
};

export default AuthorComment;
