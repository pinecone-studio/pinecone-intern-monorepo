import { Types } from 'mongoose';
import { GraphQLResolveInfo } from 'graphql';
import { concertModel } from '../../../src/models/concert.model';
import { seatModel } from '../../../src/models/seat.model';
import { createConcert } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models/concert.model');
jest.mock('../../../src/models/seat.model');

const mockInfo = {} as GraphQLResolveInfo;

const mockConcertId = new Types.ObjectId();
const mockVenueId = new Types.ObjectId().toString();

const baseInput = {
  title: 'Test Concert',
  description: 'Test Description',
  thumbnailUrl: 'http://test.com/image.jpg',
  doorOpen: '18:00',
  musicStart: '19:00',
  venue: mockVenueId,
  artistName: 'Test Artist',
  specialGuestName: 'Test Guest',
  seatData: [
    {
      date: '2025-05-01',
      seats: {
        VIP: { price: 100, availableTickets: 10 },
        Standard: { price: 70, availableTickets: 20 },
        Backseat: { price: 50, availableTickets: 30 },
      },
    },
  ],
  endDate: '2025-05-03',
};

describe('createConcert mutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create concert, handle optional fields, and generate seatData', async () => {
    (concertModel.create as jest.Mock).mockResolvedValue({
      _id: mockConcertId,
      save: jest.fn(),
      seatData: [],
    });

    (seatModel.insertMany as jest.Mock).mockResolvedValue([{ _id: new Types.ObjectId() }, { _id: new Types.ObjectId() }, { _id: new Types.ObjectId() }]);

    const result = await createConcert?.(null, { input: baseInput }, {}, mockInfo);

    expect(concertModel.create).toHaveBeenCalled();
    expect(seatModel.insertMany).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty('seatData');
    expect(result).toHaveProperty('_id');
  });

  it('should handle endDate before startDate and throw error', async () => {
    const invalidInput = {
      ...baseInput,
      endDate: '2025-04-30',
    };

    await expect(createConcert?.(null, { input: invalidInput }, {}, mockInfo)).rejects.toThrow('Дуусах огноо нь эхлэх огнооноос өмнө байж болохгүй.');
  });

  it('should handle invalid venue ID and malformed dates', async () => {
    const invalidInput = {
      ...baseInput,
      venue: 'invalid-object-id',
      seatData: [{ ...baseInput.seatData[0], date: 'invalid-date' }],
      endDate: 'not-a-date',
    };

    (concertModel.create as jest.Mock).mockRejectedValue(new Error('Database creation failed'));

    await expect(createConcert?.(null, { input: invalidInput }, {}, mockInfo)).rejects.toThrow('input must be a 24 character hex string');
  });
});
