import { QueryResolvers } from '../../../generated';
import { VenueModel } from '../../../models';

export const getVenues: QueryResolvers['getVenues'] = async () => {
  const venues = await VenueModel.find();
  return venues;
};
