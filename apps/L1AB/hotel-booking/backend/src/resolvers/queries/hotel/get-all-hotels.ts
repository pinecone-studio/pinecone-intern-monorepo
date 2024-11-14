import { QueryResolvers } from '../../../generated';
import { hotelModel } from '../../../models';

export const getAllHotels: QueryResolvers['getAllHotels'] = async () => {
  try {
    const hotels = await hotelModel.find();
    return hotels;
  } catch (error) {
    throw new Error('Failed to get all hotels');
  }
};
