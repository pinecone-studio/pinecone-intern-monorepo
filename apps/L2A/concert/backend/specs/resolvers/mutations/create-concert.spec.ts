import { createConcert as createConcertResolver } from '../../../src/resolvers/mutations';
import { concertModel } from '../../../src/models/concert.model';
import { Types } from 'mongoose';

const createConcert = createConcertResolver as NonNullable<typeof createConcertResolver>;
if (!createConcert) throw new Error('createConcert resolver is undefined');

jest.mock('dayjs', () => jest.fn((date) => jest.requireActual('dayjs')(date)));
jest.mock('../../../src/models/concert.model', () => ({
  concertModel: jest.fn().mockImplementation((data: any) => ({
    ...data,
    save: jest.fn().mockResolvedValue({ ...data, venue: new Types.ObjectId(data.venue) }),
  })),
}));

describe('createConcert mutation', () => {
  const baseInput = {
    title: 'Test Concert',
    description: 'Test Description',
    thumbnailUrl: 'http://test.com/image.jpg',
    doorOpen: '18:00',
    musicStart: '19:00',
    venue: '609e126a81b1f50f8cfa2d75',
    artistName: 'Test Artist',
    specialGuestName: 'Test Guest',
    seatData: [{ date: '2025-05-01', seats: { VIP: { price: 1000, availableTickets: 10 }, Standard: { price: 500, availableTickets: 20 }, Backseat: { price: 300, availableTickets: 30 } } }],
    endDate: '2025-05-01',
  };

  beforeEach(() => jest.clearAllMocks());

  it('should create and save a concert with all fields and handle optional fields', async () => {
    const response = await createConcert({}, { input: baseInput }, {}, {} as any);
    expect(concertModel).toHaveBeenCalledWith(expect.objectContaining({ ...baseInput, venue: expect.any(Types.ObjectId), seatData: expect.any(Array) }));
    expect(response).toMatchObject({ ...baseInput, venue: expect.any(Types.ObjectId), seatData: [{ date: '2025-05-01', seats: baseInput.seatData[0].seats }] });

    const inputWithoutOptional = { ...baseInput, description: undefined, thumbnailUrl: undefined, specialGuestName: undefined };
    const responseNoOptional = await createConcert({}, { input: inputWithoutOptional }, {}, {} as any);
    expect(concertModel).toHaveBeenCalledWith(expect.objectContaining({ description: undefined, thumbnailUrl: undefined, specialGuestName: undefined }));
    expect(responseNoOptional).toMatchObject({ description: undefined, thumbnailUrl: undefined, specialGuestName: undefined });
  });

  it('should generate seatData for single and multi-day concerts', async () => {
    const singleDayResponse = await createConcert({}, { input: baseInput }, {}, {} as any);
    expect(singleDayResponse.seatData).toHaveLength(1);
    expect(singleDayResponse.seatData[0]).toMatchObject(baseInput.seatData[0]);

    const multiDayInput = { ...baseInput, endDate: '2025-05-03' };
    const multiDayResponse = await createConcert({}, { input: multiDayInput }, {}, {} as any);
    expect(multiDayResponse.seatData).toHaveLength(3);
    expect(multiDayResponse.seatData.map((d: any) => d.date)).toEqual(['2025-05-01', '2025-05-02', '2025-05-03']);
  });

  it('should handle endDate before startDate', async () => {
    const response = await createConcert({}, { input: { ...baseInput, endDate: '2025-04-30' } }, {}, {} as any);
    expect(response.seatData).toHaveLength(0);
  });

  it('should throw error if save() fails', async () => {
    (concertModel as unknown as jest.Mock).mockImplementation(() => ({ save: jest.fn().mockRejectedValue(new Error('Database save failed')) }));
    await expect(createConcert({}, { input: baseInput }, {}, {} as any)).rejects.toThrow('Database save failed');
  });

  it('should handle invalid venue ID and date formats', async () => {
    await expect(createConcert({}, { input: { ...baseInput, venue: 'invalid-id' } }, {}, {} as any)).rejects.toThrow();
    await expect(createConcert({}, { input: { ...baseInput, seatData: [{ ...baseInput.seatData[0], date: 'invalid-date' }], endDate: 'invalid-date' } }, {}, {} as any)).rejects.toThrow();
  });
});
