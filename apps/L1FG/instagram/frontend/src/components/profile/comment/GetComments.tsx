import { useGetCommentsQuery } from '@/generated';
import { Comment } from './Comment';

const GetComments = ({ postId }: { postId: string }) => {
  const { data } = useGetCommentsQuery({
    variables: { input: { postId } },
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
