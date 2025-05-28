import { QueryResolvers } from '../../generated';
import { hotelModel } from '../../models';

export const hotels: QueryResolvers['hotels'] = async () => {
  const hotels = await hotelModel.find();
  return hotels;
};
