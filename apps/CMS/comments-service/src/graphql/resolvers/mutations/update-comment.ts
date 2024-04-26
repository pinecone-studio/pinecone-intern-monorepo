import { MutationResolvers } from '@/graphql/generated';
import { errorTypes, graphqlErrorHandler } from '../error';
import { CommentsModel } from '@/models/comment.model';

export const updateComment: MutationResolvers['updateComment'] = async (_, { updateInput }) => {
  const { _id, comment, name } = updateInput;
  try {
    const updatedComment = await CommentsModel.findByIdAndUpdate(_id, { comment, name });
    return updatedComment._id;
  } catch (e) {
    throw graphqlErrorHandler({ message: 'cannot update comment' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
