import { MutationResolvers } from '../../../generated';
import { RoomModel } from '../../../models';

export const createRoom: MutationResolvers['createRoom'] = async (_, { input }) => {
  const { hotelId, name, roomNumber, price, bed, images, roomInfo, type, bathroom, accessibility, internet, foodAndDrink, bedroom, other, tax } = input;
  try {
    const newRoom = await RoomModel.create({
      hotelId,
      name,
      roomNumber,
      price,
      bed,
      images,
      roomInfo,
      type,
      bathroom,
      accessibility,
      internet,
      foodAndDrink,
      bedroom,
      other,
      tax,
    });
    return {
      code: 200,
      success: true,
      message: 'Room created successfully',
      room: newRoom,
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      message: 'Failed to create room',
      room: undefined,
    };
  }
};
