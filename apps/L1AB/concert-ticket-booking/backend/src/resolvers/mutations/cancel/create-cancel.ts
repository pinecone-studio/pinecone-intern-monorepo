import { MutationResolvers } from '../../../generated';
import { cancelModel } from '../../../models';

export const createCancel: MutationResolvers['createCancel'] = async (_, { input }) => {
  const cancel = await cancelModel.create(input);
  return cancel;
};
