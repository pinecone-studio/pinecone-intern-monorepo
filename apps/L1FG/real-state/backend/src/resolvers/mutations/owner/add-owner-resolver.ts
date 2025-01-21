import { MutationResolvers } from '../../../generated';
import { Owner } from '../../../models/owner-model';

export const addOwner: MutationResolvers['addOwner'] = async (__, { input }) => {
  const { _id, title, description, price, status, updatedAt, propertyOwnerId, propertyDetail, createdAt } = input;

  const owner = await Owner.create({ _id, title, description, price, propertyOwnerId, propertyDetail, status, createdAt, updatedAt });
  console.log(owner);

  return owner;
};
