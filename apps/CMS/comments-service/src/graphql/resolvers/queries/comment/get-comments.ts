import { CommentsModel } from '../../../../models/comment.model';
import { GraphQLError } from 'graphql/error';
import { CommentStatus, QueryResolvers } from '@/graphql/generated';

interface GetCommentsInput {
  limit: number;
  offset: number;
  status?: CommentStatus[];
}

export const getComments: QueryResolvers['getComments'] = async (_, { input }: { input: GetCommentsInput }) => {
  const { limit, offset, status } = input;
  try {
    const filter: Partial<{ status: CommentStatus | CommentStatus[] }> = {};
    if (status && status.length > 0) {
      filter.status = status ;
    }
    const commentsPromise = CommentsModel.find(filter).limit(limit).skip(offset);
    const allCountPromise = CommentsModel.countDocuments();
    const filteredCountPromise = CommentsModel.countDocuments(filter);
    const hiddenCountPromise = CommentsModel.countDocuments({ status: CommentStatus.Hidden });
    const normalCountPromise = CommentsModel.countDocuments({ status: CommentStatus.Normal });
    const deletedCountPromise = CommentsModel.countDocuments({ status: CommentStatus.Deleted});
    const [comments, filteredCount, allCount, hiddenCount, normalCount, deletedCount] = await Promise.all([
      commentsPromise,
      filteredCountPromise,
      allCountPromise,
      hiddenCountPromise,
      normalCountPromise,
      deletedCountPromise,
    ]);

    return {
      count: filteredCount,
      allCount,
      hiddenCount,
      normalCount,
      deletedCount,
      comments,
    };
  } catch (error) {
    throw new GraphQLError(`Error in get comments query`);
  }
};
