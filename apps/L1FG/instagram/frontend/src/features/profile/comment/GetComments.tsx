import { useGetCommentsQuery, UserPostType } from '@/generated';
import { Comment } from './Comment';

const GetComments = ({ post }: { post: UserPostType }) => {
  const { data } = useGetCommentsQuery({
    variables: { input: { postId: post._id, after: '', first: 12 } },
  });

  return (
    <div className="flex flex-col gap-6 ">
      {data?.getComments?.edges.map((comment, index) => (
        <Comment post={post} comment={comment.node} key={index} />
      ))}
    </div>
  );
};

export default GetComments;
