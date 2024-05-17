import { MutationResolvers } from '@/graphql/generated';
import { errorTypes, graphqlErrorHandler } from '../../error';
import { CommentsModel } from '@/models/comment.model';

export const hideCommentByAdmin: MutationResolvers['hideCommentByAdmin'] = async (_, { id }) => {
  try {
    const hiddenComment = await CommentsModel.findByIdAndUpdate(id, { status: 'HIDDEN' });
    return hiddenComment._id;
  } catch (error) {
    throw graphqlErrorHandler({ message: `cannot hide comment by admin` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
