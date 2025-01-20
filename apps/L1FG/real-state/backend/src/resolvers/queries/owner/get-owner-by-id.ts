import { QueryResolvers } from '../../../generated';
import { Owner } from '../../../models/owner-model';

export const getOwnerById: QueryResolvers['getOwnerById'] = async (_: unknown, { _id }) => {
  const owner = await Owner.findById(_id);

  if (!owner) {
    throw new Error('There is no owner post with this id');
  }
  return owner;
};
