import { MutationResolvers } from '@/graphql/generated';
import { errorTypes, graphqlErrorHandler } from '../error';
import { CommentsModel } from '@/models/comment.model';
import { accessTokenAuth } from '@/middlewares/auth-token';

export const updateComment: MutationResolvers['updateComment'] = async (_, { updateInput }, { req }) => {
  await accessTokenAuth(req);
  const { _id, comment } = updateInput;
  try {
    const updatedComment = await CommentsModel.findByIdAndUpdate(_id, { comment });
    return updatedComment._id;
  } catch (e) {
    throw graphqlErrorHandler({ message: 'cannot update comment' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
