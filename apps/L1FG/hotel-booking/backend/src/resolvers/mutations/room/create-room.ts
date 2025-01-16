import { MutationResolvers } from '../../../generated';
import { RoomModel } from '../../../models';

export const createRoom: MutationResolvers['createRoom'] = async (_, { input }) => {
  const { hotelId, name, roomNumber, price, bed, images, roomInfo, type, roomServices, tax } = input;
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
      roomServices,
      tax,
    });
    return {
      code: 200,
      success: true,
      message: 'Room created successfully',
      room: newRoom,
    };
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      success: false,
      message: 'Failed to create room',
      room: undefined,
    };
  }
};
