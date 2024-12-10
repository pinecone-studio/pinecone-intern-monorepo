import { MutationResolvers } from '../../../generated';
import { savedModel } from '../../../models';

export const createSave: MutationResolvers['createSave'] = async (_, { userId, postId }) => {
  const existingSave = await savedModel.findOne({ userId, postId });

  if (existingSave) {
    await savedModel.deleteOne({ userId, postId });
    return { message: 'Unsaved post successfully' };
  }

  await savedModel.create({ userId, postId });
  return { message: 'Saved post successfully' };
};
