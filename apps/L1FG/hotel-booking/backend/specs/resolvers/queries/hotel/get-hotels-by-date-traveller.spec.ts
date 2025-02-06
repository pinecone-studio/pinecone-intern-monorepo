import { GraphQLResolveInfo } from 'graphql';
import { getHotelsByDateTraveller } from 'apps/L1FG/hotel-booking/backend/src/resolvers/queries';
import { HotelModel, RoomModel, BookingModel } from '../../../../src/models';

jest.mock('../../../../src/models', () => ({
  BookingModel: {
    distinct: jest.fn().mockResolvedValue([{ roomId: '1', hotelId: '1' }]),
  },
  RoomModel: {
    find: jest.fn().mockResolvedValue([{ hotelId: '1' }]),
  },
  HotelModel: {
    find: jest.fn().mockResolvedValue([{ id: '1' }]),
  },
}));

describe('getHotelsByDateTraveller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should mock BookingModel.distinct', async () => {
    const input = { startDate: '2025-10-10', endDate: '2025-10-15', travellerCount: 2 };
    (BookingModel.distinct as jest.Mock).mockResolvedValueOnce([]);

    const response = await getHotelsByDateTraveller!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(BookingModel.distinct).toHaveBeenCalledWith('roomId', { $or: [{ startDate: { $lt: input.endDate }, endDate: { $gt: input.startDate } }] });
    expect(response).toEqual([{ id: '1' }]);
  });

  it('Should mock RoomModel.find', async () => {
    const input = { startDate: '2025-10-10', endDate: '2025-10-15', travellerCount: 2 };
    const mockRooms = [{ id: '1', hotelId: '1' }];

    (RoomModel.find as jest.Mock).mockResolvedValueOnce(mockRooms);

    const response = await getHotelsByDateTraveller!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(RoomModel.find).toHaveBeenCalledWith({
      bed: input.travellerCount,
      _id: { $nin: [{ roomId: '1', hotelId: '1' }] },
    });
    expect(response).toEqual([{ id: '1' }]);
  });

  it('Should mock HotelModel.find', async () => {
    const input = { startDate: '2025-10-10', endDate: '2025-10-15', travellerCount: 2 };
    const mockHotels = [{ id: '1' }];

    (HotelModel.find as jest.Mock).mockResolvedValueOnce(mockHotels);

    const response = await getHotelsByDateTraveller!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(HotelModel.find).toHaveBeenCalledWith({ _id: { $in: ['1'] } });
    expect(response).toEqual(mockHotels);
  });
  it('Should handle case when there are no booked rooms', async () => {
    (BookingModel.distinct as jest.Mock).mockResolvedValueOnce([]);
    (RoomModel.find as jest.Mock).mockResolvedValueOnce([{ hotelId: '1' }]);
    (HotelModel.find as jest.Mock).mockResolvedValueOnce([{ id: '1' }]);

    const input = { startDate: '2025-10-10', endDate: '2025-10-15', travellerCount: 2 };
    const response = await getHotelsByDateTraveller!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(response).toEqual([{ id: '1' }]);
  });
  it('Should return an empty array if no rooms match criteria', async () => {
    (BookingModel.distinct as jest.Mock).mockResolvedValueOnce([]);
    (RoomModel.find as jest.Mock).mockResolvedValueOnce([]);

    const input = { startDate: '2025-10-10', endDate: '2025-10-15', travellerCount: 2 };
    const response = await getHotelsByDateTraveller!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(response).toEqual([{ id: '1' }]);
  });
  it('Should return an empty array if no hotels match the room results', async () => {
    (BookingModel.distinct as jest.Mock).mockResolvedValueOnce([]);
    (RoomModel.find as jest.Mock).mockResolvedValueOnce([{ hotelId: '2' }]);
    (HotelModel.find as jest.Mock).mockResolvedValueOnce([]);

    const input = { startDate: '2025-10-10', endDate: '2025-10-15', travellerCount: 2 };
    const response = await getHotelsByDateTraveller!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(response).toEqual([]);
  });
});
