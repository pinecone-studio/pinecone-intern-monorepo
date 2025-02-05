import { BookingModel, RoomModel, HotelModel } from '../../../models';
import { QueryResolvers } from '../../../generated';

export const getHotelsByDateTraveller: QueryResolvers['getHotelsByDateTraveller'] = async (_, { input }) => {
  const { startDate, endDate, travellerCount } = input;

  const bookedRoomIds = await BookingModel.distinct('roomId', {
    $or: [{ startDate: { $lt: endDate }, endDate: { $gt: startDate } }],
  });
  const rooms = await RoomModel.find({
    bed: travellerCount,
    _id: { $nin: bookedRoomIds },
  });
  const hotelIds = rooms.map((room) => room.hotelId);

  const hotels = await HotelModel.find({ _id: { $in: hotelIds } });

  return hotels;
};
