import { GetCommentsQuery, useGetCommentsQuery, UserPostType } from '@/generated';
import { Comment } from './Comment';
import { PlusCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import CommentPreviewSkeleton from '@/components/skeleton/CommentPreviewSkeleton';

const GetComments = ({ post }: { post: UserPostType }) => {
  const [moreCommentsLoading, setMoreCommentsLoading] = useState(false);
  const { data, loading, fetchMore } = useGetCommentsQuery({
    variables: { input: { postId: post?._id, after: '', first: 4 } },
  });

  const updateQueryHandler = (prevResult: GetCommentsQuery, { fetchMoreResult }: { fetchMoreResult?: GetCommentsQuery }): GetCommentsQuery => {
    if (!fetchMoreResult) return prevResult;

    const prevEdges = prevResult.getComments?.edges ?? [];
    const fetchResultEdges = fetchMoreResult.getComments?.edges ?? [];

    return {
      getComments: {
        ...fetchMoreResult.getComments,
        edges: [...prevEdges, ...fetchResultEdges],
        pageInfo: fetchMoreResult.getComments?.pageInfo,
      },
    };
  };
  const handleMoreComments = async () => {
    setMoreCommentsLoading(true);
    await fetchMore({
      variables: {
        input: {
          postId: post?._id,
          after: data?.getComments?.pageInfo?.endCursor,
          first: 6,
        },
      },
      updateQuery: updateQueryHandler, // ✅ Type-safe function
    });
    setMoreCommentsLoading(false);
  };

  return (

    <div className="flex flex-col gap-6 overflow-y-scroll">
      {loading && <CommentPreviewSkeleton />}
      {data?.getComments?.edges.map((comment) => (
        <Comment post={post} comment={comment.node} key={comment.cursor} />
      ))}

      {data?.getComments?.pageInfo.hasNextPage && (
        <div className="flex justify-center items-center">
          {moreCommentsLoading ? (
            <Loader2 className="animate-spin text-gray-500" size={24} /> // Spinner while loading
          ) : (
            <PlusCircle className="cursor-pointer hover:text-blue-500" onClick={handleMoreComments} size={28} />
          )}
        </div>
      )}
    </div>
  );
};

export default GetComments;
