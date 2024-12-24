import { bookingModel, roomModel, roomPopulatedType } from '../../../models';
import { QueryResolvers } from '../../../generated';

export const getAvailableRooms: QueryResolvers['getAvailableRooms'] = async (_, { dateRange, traveler }) => {
  const { checkIn, checkOut } = dateRange;

  const bookedRooms = await bookingModel.find({
    $or: [
      {
        checkIn: { $gte: checkIn, $lt: checkOut },
      },
      {
        checkOut: { $gt: checkIn, $lte: checkOut },
      },
    ],
  });

  const allRooms = (await roomModel.find().populate<roomPopulatedType>('hotelId')).map((el) => el.toObject());

  const bookedRoomIds = bookedRooms.map((booking) => booking.roomId.toString());
  const availableRooms = allRooms.filter((room) => !bookedRoomIds.includes(room._id));

  const roomsForTravelers = availableRooms.filter((room) => room.maxCapacity >= traveler);

  if (traveler > Math.max(...availableRooms.map((room) => room.maxCapacity))) {
    throw new Error('Number of travelers exceeds the maximum room capacity available.');
  }

  return roomsForTravelers;
};
