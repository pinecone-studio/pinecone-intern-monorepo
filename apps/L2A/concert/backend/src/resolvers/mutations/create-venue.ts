import { MutationResolvers } from '../../generated';
import { venueModel } from '../../models';
import { catchError } from '../../utils/catch-error';

export const createVenue: MutationResolvers['createVenue'] = async (_, { name, address, city, capacity }) => {
  try {
    const existingVenue = await venueModel.findOne({ name });

    if (existingVenue) {
      throw new Error('Venue already exists');
    }

    const newVenue = await venueModel.create({
      name,
      address,
      city,
      capacity,
    });

    return newVenue;
  } catch (error) {
    catchError(error);
  }
};
