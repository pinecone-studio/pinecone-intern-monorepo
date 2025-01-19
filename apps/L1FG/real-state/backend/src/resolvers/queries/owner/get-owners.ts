import { Owner } from '../../../models/owner-model';
import { QueryResolvers } from '../../../generated';

export const getOwners: QueryResolvers['getOwners'] = async (_: unknown, { input }: { input?: any }) => {
  const PENDING = input;
  const owners = await Owner.find({ OwnerStatus: PENDING });
  if (!owners) {
    throw new Error('there is no owners post');
  }
  return owners;
};
