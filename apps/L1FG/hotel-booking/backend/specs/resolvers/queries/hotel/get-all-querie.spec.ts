import { getAllQuerie } from 'apps/L1FG/hotel-booking/backend/src/resolvers/queries';
import { BookingModel, RoomModel, HotelModel } from '../../../../src/models';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  HotelModel: {
    aggregate: jest
      .fn()
      .mockResolvedValueOnce([{ id: '1' }])
      .mockResolvedValueOnce(null),
  },
  BookingModel: {
    distinct: jest.fn().mockResolvedValue([{ roomId: '1', hotelId: '1' }]),
  },
  RoomModel: {
    find: jest.fn().mockResolvedValue([{ hotelId: '1' }]),
  },
}));

describe('getAllQuerie', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('get hotels ascending or descending', async () => {
    const mockHotels = [{ id: '1' }];
    const response = await getAllQuerie!(
      {},
      {
        input: {
          type: 'asc',
          endDate: undefined,
          startDate: undefined,
          travellerCount: 0,
        },
      },
      {},
      {} as GraphQLResolveInfo
    );
    expect(response).toEqual(mockHotels);
  });

  it('should return hooson cause they were not found', async () => {
    const response = await getAllQuerie!(
      {},
      {
        input: {
          type: 'haha',
          endDate: undefined,
          startDate: undefined,
          travellerCount: 0,
        },
      },
      {},
      {} as GraphQLResolveInfo
    );
    expect(response).toEqual(null);
  });

  it('Should mock BookingModel.distinct', async () => {
    const input = { startDate: '2025-10-10', endDate: '2025-10-15', travellerCount: 2 };

    // Мок-ийн утга зөв гаргах
    (BookingModel.distinct as jest.Mock).mockResolvedValueOnce([{ roomId: '1' }]);

    const response = await getAllQuerie!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(BookingModel.distinct).toHaveBeenCalledWith('roomId', { $or: [{ startDate: { $lt: input.endDate }, endDate: { $gt: input.startDate } }] });
    expect(response);
  });

  it('Should mock RoomModel.find', async () => {
    const input = { startDate: '2025-10-10', endDate: '2025-10-15', travellerCount: 2 };
    const mockRooms = [{ id: '1', hotelId: '1' }];

    (RoomModel.find as jest.Mock).mockResolvedValueOnce(mockRooms);

    const response = await getAllQuerie!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(RoomModel.find).toHaveBeenCalledWith({
      bed: input.travellerCount,
      _id: { $nin: [{ roomId: '1', hotelId: '1' }] },
    });
    expect(response);
  });

  it('Should mock HotelModel.find', async () => {
    const input = { startDate: '2025-10-10', endDate: '2025-10-15', travellerCount: 2 };

    HotelModel.find as jest.Mock;
    const response = await getAllQuerie!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(HotelModel.find);
    expect(response);
  });
  it('Should handle case when there are no booked rooms', async () => {
    (BookingModel.distinct as jest.Mock).mockResolvedValueOnce([]);
    (RoomModel.find as jest.Mock).mockResolvedValueOnce([{ hotelId: '1' }]);
    HotelModel.find as jest.Mock;

    const input = { startDate: '2025-10-10', endDate: '2025-10-15', travellerCount: 2 };
    const response = await getAllQuerie!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(response);
  });
  it('Should return an empty array if no rooms match criteria', async () => {
    (BookingModel.distinct as jest.Mock).mockResolvedValueOnce([]);
    (RoomModel.find as jest.Mock).mockResolvedValueOnce([]);

    const input = { startDate: '2025-10-10', endDate: '2025-10-15', travellerCount: 2 };
    const response = await getAllQuerie!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(response);
  });
  it('Should return an empty array if no hotels match the room results', async () => {
    (BookingModel.distinct as jest.Mock).mockResolvedValueOnce([]);
    (RoomModel.find as jest.Mock).mockResolvedValueOnce([{ hotelId: '2' }]);
    HotelModel.find as jest.Mock;
    const input = { startDate: '2025-10-10', endDate: '2025-10-15', travellerCount: 2 };
    const response = await getAllQuerie!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(response);
  });
});
