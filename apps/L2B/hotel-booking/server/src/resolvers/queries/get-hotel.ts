import { hotelModel } from '../../models';

export const hotel = async (_: unknown, { id }: { id: string }) => {
  if (!id) {
    throw new Error('Hotel ID is required.');
  }

  const hotel = await hotelModel.findById(id);

  if (!hotel) {
    throw new Error('Hotel not found');
  }
  return hotel;
};
