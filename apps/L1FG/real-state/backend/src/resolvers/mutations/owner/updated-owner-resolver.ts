import { Owner } from '../../../models/owner-model';
import { MutationResolvers } from '../../../generated';

export const updatedOwner: MutationResolvers['updatedOwner'] = async (__, { _id, input }) => {
  const { propertyOwnerId, title, description, price, propertyDetail, status } = input;

  const updatedOwner = await Owner.findByIdAndUpdate(_id, {
    _id,
    propertyOwnerId,
    title,
    description,
    price,
    propertyDetail,
    status,
    updatedAt: new Date(Date.now()),
    createdAt: new Date(Date.now()),
  });

  return updatedOwner;
};
