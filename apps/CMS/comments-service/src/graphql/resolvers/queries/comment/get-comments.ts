import { CommentStatus, QueryResolvers } from '@/graphql/generated';
import { CommentsModel } from '../../../../models/comment.model';
import { GraphQLError } from 'graphql/error';

interface GetCommentsInput {
  limit: number;
  offset: number;
  status?: CommentStatus | CommentStatus[];
}

export const getComments: QueryResolvers['getComments'] = async (_, { input }: { input: GetCommentsInput }) => {
  const { limit, offset, status } = input;
  try {
    const filter: Partial<{ status: CommentStatus | CommentStatus[] }> = {};
    if (status) {
      filter.status = status;
    }
    const commentsPromise = CommentsModel.find(filter).limit(limit).skip(offset);
    const allCountPromise = CommentsModel.countDocuments();
    const filteredCountPromise = CommentsModel.countDocuments(filter);
    const hiddenCountPromise = CommentsModel.countDocuments({ status: 'HIDDEN' });
    const normalCountPromise = CommentsModel.countDocuments({ status: 'NORMAL' });
    const deletedCountPromise = CommentsModel.countDocuments({ status: 'DELETED' });

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
