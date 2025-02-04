import { HotelModel } from '../../../models';
import { QueryResolvers } from '../../../generated';

export const getHotelsByStarRating: QueryResolvers['getHotelsByStarRating'] = async () => {
  const hotels = await HotelModel.find().sort({ starRating: -1 });
  if (!hotels) {
    return [];
  }
  return hotels;
};
