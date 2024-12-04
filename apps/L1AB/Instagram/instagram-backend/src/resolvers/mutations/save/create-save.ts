import { MutationResolvers, Response } from '../../../generated';
import { savedModel } from '../../../models';

export const createSave: MutationResolvers['createSave'] = async (_, { userId, postId }) => {
  const savedPost = await savedModel.findOne({ postId: postId, userId: userId });

  if (savedPost) {
    await savedModel.deleteOne({ postId: postId, userId: userId });
    return Response.Success;
  } else {
    await savedModel.create({ userId: userId, postId });
    return Response.Success;
  }
};
