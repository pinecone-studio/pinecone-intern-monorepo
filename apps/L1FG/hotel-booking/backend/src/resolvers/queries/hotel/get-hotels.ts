import { QueryResolvers } from '../../../generated';
import { HotelModel } from '../../../models';

export const getHotels: QueryResolvers['getHotels'] = async () => {
  const hotels = await HotelModel.find();

  return hotels;
};
