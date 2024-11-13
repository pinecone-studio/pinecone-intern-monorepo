import { QueryResolvers } from '../../../generated';
import { hotelModel } from '../../../models';

export const getAllHotels: QueryResolvers['getAllHotels'] = async () => {
  try {
    const response = await hotelModel.find();
    return response;
  } catch (error) {
    throw new Error('Failed to get all hotels');
  }
};
