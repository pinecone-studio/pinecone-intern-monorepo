import { useGetCommentsQuery, UserPostType } from '@/generated';
import { Comment } from './Comment';
import { PlusCircle } from 'lucide-react';

const GetComments = ({ post }: { post: UserPostType }) => {
  const { data, fetchMore } = useGetCommentsQuery({
    variables: { input: { postId: post._id, after: '', first: 4 } },
  });
  const handleMoreCommments = () => {
    fetchMore({
      variables: {
        input: {
          postId: post._id,
          after: data?.getComments?.pageInfo?.endCursor,
          first: 6,
        },
      },
      updateQuery(prevResult, { fetchMoreResult }) {
        if (!fetchMoreResult) {
          return prevResult;
        }
        if (prevResult.getComments?.pageInfo?.endCursor == fetchMoreResult.getComments?.pageInfo?.endCursor) {
          return prevResult;
        }
        const prevEdges = prevResult.getComments?.edges;
        const fetchResultEdges = fetchMoreResult.getComments?.edges;
        return {
          getComments: {
            ...fetchMoreResult.getComments,
            edges: [...prevEdges, ...fetchResultEdges],
            pageInfo: fetchMoreResult.getComments?.pageInfo,
          },
        };
      },
    });
  };
  return (
    <div className="flex flex-col gap-6 overflow-y-scroll">
      {data?.getComments?.edges.map((comment, index) => (
        <Comment post={post} comment={comment.node} key={index} />
      ))}
      {data?.getComments?.pageInfo.hasNextPage && (
        <div className="flex justify-center">
          <PlusCircle onClick={handleMoreCommments} />
        </div>
      )}
    </div>
  );
};

export default GetComments;
