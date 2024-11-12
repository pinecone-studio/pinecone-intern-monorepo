import { MutationResolvers } from '../../../generated';
import { VenueModel } from '../../../models';

export const createVenue: MutationResolvers['createVenue'] = async (_, { name, additional }) => {
  const newVenue = await VenueModel.create({
    name,
    additional,
  });

  return newVenue;
};
