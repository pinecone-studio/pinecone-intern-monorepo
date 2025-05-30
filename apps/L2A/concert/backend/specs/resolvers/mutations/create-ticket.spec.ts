import { seatModel } from '../../../src/models';
import { convertTickets } from '../../../src/utils/convert-ticket';
import { findSeatById } from '../../../src/utils/get-seat-by-id';
import * as Mutation from '../../../src/resolvers/mutations/create-ticket';

const createTicketOrder = Mutation.createTicketOrder!;

jest.mock('../../../src/models/seat.model', () => ({
  seatModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));

jest.mock('../../../src/utils/convert-ticket', () => ({
  convertTickets: jest.fn(),
}));

jest.mock('../../../src/utils/get-seat-by-id', () => ({
  findSeatById: jest.fn(),
}));

describe('createTicketOrder resolver', () => {
  const mockInput = {
    input: {
      concertId: '6824b74c8db390ee25b237e9',
      seatDataId: '6825f8dff1ef934785445506',
      date: '2025-06-12',
      tickets: [
        { count: 2, price: 12222, type: 'Энгийн тасалбар' },
        { count: 2, price: 12222, type: 'VIP тасалбар' },
      ],
      totalPrice: 2000,
      userId: '680b34774df77e229421f7ac',
    },
  };

  const mockSeat = {
    _id: '6825f8dff1ef934785445506',
    seats: {
      VIP: { availableTickets: 500 },
      Standard: { availableTickets: 1500 },
      Backseat: { availableTickets: 1000 },
    },
  };

  const mockTicketMap = {
    VIP: { count: 2, price: 12222 },
    Standard: { count: 2, price: 12222 },
    Backseat: { count: 0, price: 0 },
  };

  const mockUpdatedSeat = {
    ...mockSeat,
    seats: {
      VIP: { availableTickets: 498 },
      Standard: { availableTickets: 1498 },
      Backseat: { availableTickets: 1000 },
    },
  };

  beforeEach(() => {
    (findSeatById as jest.Mock).mockResolvedValue(mockSeat);
    (convertTickets as jest.Mock).mockReturnValue(mockTicketMap);
    (seatModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedSeat);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly subtract availableTickets and return updated seat model', async () => {
    const result = await createTicketOrder({}, mockInput, {} as any, {} as any);

    expect(findSeatById).toHaveBeenCalledWith(mockInput.input.seatDataId);
    expect(convertTickets).toHaveBeenCalledWith(mockInput.input.tickets);

    expect(seatModel.findByIdAndUpdate).toHaveBeenCalledWith(
      mockInput.input.seatDataId,
      {
        $set: {
          'seats.VIP.availableTickets': 498,
          'seats.Standard.availableTickets': 1498,
          'seats.Backseat.availableTickets': 1000,
        },
      },
      { new: true }
    );

    expect(result).toEqual(mockUpdatedSeat);
  });
});
