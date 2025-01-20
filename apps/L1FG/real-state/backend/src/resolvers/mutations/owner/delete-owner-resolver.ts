import { MutationResolvers } from '../../../generated';
import { Owner } from '../../../models/owner-model';

export const deleteOwner: MutationResolvers['deleteOwner'] = async (_, { _id }) => {
  const owner = await Owner.findByIdAndDelete(_id);
  if (!owner) {
    throw new Error('Owner not found');
  }
  return owner;
};
