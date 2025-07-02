import { HotelInput } from '../../generated';
import { hotelModel } from '../../models';

export const createHotel = async (_: unknown, { input }: { input: HotelInput }) => {
  try {
    const newHotel = await hotelModel.create(input);

    const hotelObj = newHotel.toObject();
    return {
      ...hotelObj,
      id: hotelObj._id,
    };
  } catch (error) {
    throw new Error('Failed to create hotel: ' + error);
  }
};

export const updateHotel = async (_: unknown, { id, input }: { id: string; input: HotelInput }) => {
  try {
    const updateHotel = await hotelModel.findByIdAndUpdate(id, input, {
      new: true,
      runValidators: true,
    });

    if (!updateHotel) {
      throw new Error('Hotel not found');
    }

    return updateHotel;
  } catch (error) {
    throw new Error('Failed to update hotel: ' + error);
  }
};

export const deleteHotel = async (_: unknown, { id }: { id: string }) => {
  try {
    const deleteHotel = await hotelModel.findByIdAndDelete(id);

    if (!deleteHotel) {
      throw new Error('Hotel not found');
    }

    return { success: true, message: 'Hotel deleted successfully' };
  } catch (error) {
    throw new Error('Failed to delete hotel: ' + error);
  }
};
