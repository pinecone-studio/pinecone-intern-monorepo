import { MutationResolvers } from '../../../generated';
import { hotelModel } from '../../../models';

export const createHotel: MutationResolvers['createHotel'] = async (_: unknown, { input }) => {
  try {
    const hotel = await hotelModel.create(input);
    return hotel;
  } catch (error) {
    throw new Error('Failed to create hotel');
  }
};
