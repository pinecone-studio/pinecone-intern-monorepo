import { HotelModel } from '../../../models';
import { QueryResolvers } from '../../../generated';

export const getHotelsByStarRating: QueryResolvers['getHotelsByStarRating'] = async (_, { sortByRating }) => {
  const query = HotelModel.find();

  // sortByRating нь true бол starRating-аар эрэмбэлэх
  if (sortByRating) {
    query.sort({ starRating: -1 });
  }

  const hotels = await query;
  return hotels;
};
