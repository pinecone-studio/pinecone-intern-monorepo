import { HotelInput } from '../../generated';
import { hotelModel, roomModel } from '../../models';

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
    const hotel = await hotelModel.findById(id);

    if (!hotel) {
      throw new Error('Hotel not found');
    }

    await roomModel.deleteMany({ hotelId: id });

    await hotelModel.findByIdAndDelete(id);

    return { success: true, message: 'Hotel and its rooms deleted successfully' };
  } catch (error) {
    throw new Error('Failed to delete hotel: ' + error);
  }
};
