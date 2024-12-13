import { bookingModel, roomModel, roomPopulatedType } from '../../../models';
import { QueryResolvers } from '../../../generated';

type DateRangeType = {
  checkIn: Date;
  checkOut: Date;
};

const checkDateRange = ({ checkIn, checkOut }: DateRangeType) => {
  const parsedCheckIn = new Date(checkIn);
  const parsedCheckOut = new Date(checkOut);

  const currentDate = new Date();

  if (parsedCheckIn < currentDate || parsedCheckOut < currentDate) {
    throw new Error('Check-in and check-out dates must be in the future.');
  }

  if (parsedCheckOut <= parsedCheckIn) {
    throw new Error('Check-out date must be later than check-in date.');
  }

  return { parsedCheckIn, parsedCheckOut };
};

export const getAvailableRooms: QueryResolvers['getAvailableRooms'] = async (_, { dateRange, traveler }) => {
  const { checkIn, checkOut } = dateRange;

  const { parsedCheckIn, parsedCheckOut } = checkDateRange({ checkIn, checkOut });

  const bookedRooms = await bookingModel.find({
    $or: [
      {
        checkIn: { $gte: parsedCheckIn, $lt: parsedCheckOut },
      },
      {
        checkOut: { $gt: parsedCheckIn, $lte: parsedCheckOut },
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
