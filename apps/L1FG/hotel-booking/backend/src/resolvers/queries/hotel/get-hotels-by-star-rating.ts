import { HotelModel } from '../../../models';
import { QueryResolvers } from '../../../generated';

export const getHotelsByStarRating: QueryResolvers['getHotelsByStarRating'] = async (_, { sortByRating }) => {
  const query = HotelModel.find();

  if (sortByRating) {
    query.sort({ starRating: -1 });
  }

  const hotels = await query;
  return hotels;
};
