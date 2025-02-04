import { HotelModel } from '../../../models';
import { QueryResolvers } from '../../../generated';

export const getHotelsByName: QueryResolvers['getHotelsByName'] = async (_, { input }) => {
  const { name } = input;
  const hotels = await HotelModel.find({ name: { $regex: name } });
  if (!hotels) {
    return [];
  }
  return hotels;
};
