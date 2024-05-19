import { CommentStatus, QueryResolvers } from '@/graphql/generated';
import { CommentsModel } from '../../../../models/comment.model';
import { GraphQLError } from 'graphql/error';

interface GetCommentsInput {
  limit: number;
  offset: number;
  status?: CommentStatus[];
}

export const getComments: QueryResolvers['getComments'] = async (_, { input }: { input: GetCommentsInput }) => {
  const { limit, offset, status } = input;
  try {
    const filter: Partial<{ status: CommentStatus[] }> = {};
    if (status && status.length > 0) {
       filter.status = status;
    }
    const comments = await CommentsModel.find(filter).limit(limit).skip(offset).exec();
    const counts = await CommentsModel.aggregate([
      {
        $facet: {
          allCount: [{ $count: "count" }],
          hiddenCount: [{ $match: { status: 'HIDDEN' } }, { $count: "count" }],
          normalCount: [{ $match: { status: 'NORMAL' } }, { $count: "count" }],
          deletedCount: [{ $match: { status: 'DELETED' } }, { $count: "count" }]
        }
      },
      {
        $project: {
          allCount: { $arrayElemAt: ["$allCount.count", 0] },
          hiddenCount: { $arrayElemAt: ["$hiddenCount.count", 0] },
          normalCount: { $arrayElemAt: ["$normalCount.count", 0] },
          deletedCount: { $arrayElemAt: ["$deletedCount.count", 0] }
        }
      }
    ]);
    return {
      allCount: counts[0].allCount,
      hiddenCount: counts[0].hiddenCount,
      normalCount: counts[0].normalCount,
      deletedCount: counts[0].deletedCount,
      comments: comments,
    };
  } catch (error) {
    throw new GraphQLError(`Error in get comments query`);
  }
};
