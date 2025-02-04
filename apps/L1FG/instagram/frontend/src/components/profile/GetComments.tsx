import { useGetCommentsQuery } from '@/generated';

const GetComments = ({ postId }: { postId: string }) => {
  const { data } = useGetCommentsQuery({
    variables: { input: { postId } },
  });
  return (
    <div>
      {data?.getComments?.map((comment, index) => (
        <div key={index}>{comment.comment}</div>
      ))}
    </div>
  );
};

export default GetComments;
