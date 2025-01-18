import { MutationResolvers } from '../../../generated';
import { Owner } from '../../../models/owner-model';

export const addOwner: MutationResolvers['createOwner'] = async (__, { input }) => {
  const { propertyOwnerId, title, description, price, propertyDetail, status, updatedAt, createdAt } = input;
  const owner = await Owner.create({ propertyOwnerId, title, description, price, propertyDetail, status, createdAt, updatedAt });
  return owner;
};
