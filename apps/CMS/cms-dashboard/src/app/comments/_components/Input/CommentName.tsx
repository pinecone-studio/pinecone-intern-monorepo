import { Comment } from '@/generated';

const CommentName = ({ name }: Comment) => {
  return (
    <p className="font-extrabold" data-testid="comment-name-test-id">
      {name}
    </p>
  );
};

export default CommentName;
