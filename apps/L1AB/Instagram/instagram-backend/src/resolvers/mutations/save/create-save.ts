import { MutationResolvers, Response } from '../../../generated';
import { savedModel } from '../../../models';

export const createSave: MutationResolvers['createSave'] = async (_, { userId, postId }) => {
  console.log('hi');

  const savedPost = await savedModel.findOne({ postId: postId, userId: userId });
  console.log(savedPost);

  if (savedPost) {
    await savedModel.deleteOne({ postId: postId, userId: userId });
    return Response.Success;
  } else {
    await savedModel.create({ userId: userId, postId });
    return Response.Success;
  }
};
