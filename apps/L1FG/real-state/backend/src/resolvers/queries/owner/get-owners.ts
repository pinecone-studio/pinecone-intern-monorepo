import { Owner } from '../../../models/owner-model';
import { QueryResolvers } from '../../../generated';

export const getOwners: QueryResolvers['getOwners'] = async (_, { input = {} }) => {
  const owners = await Owner.find(input);
  if (!owners) {
    throw new Error('there is no owners post');
  }
  return owners;
};
