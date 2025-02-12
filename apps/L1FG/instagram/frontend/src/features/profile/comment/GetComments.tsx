import { useGetCommentsQuery, UserPostType } from '@/generated';
import { Comment } from './Comment';

const GetComments = ({ post }: { post: UserPostType }) => {
  const { data } = useGetCommentsQuery({
    variables: { input: { postId: post._id } },
  });

  return (
    <div className="flex flex-col gap-6 ">
      {data?.getComments?.map((comment, index) => (
        <Comment comment={comment} key={index} />
      ))}
    </div>
  );
};

export default GetComments;
