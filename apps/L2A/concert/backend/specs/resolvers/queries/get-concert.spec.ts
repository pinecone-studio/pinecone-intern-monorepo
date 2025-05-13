import { concert } from '../../../src/resolvers/queries/get-concert';
import { concertModel } from '../../../src/models/concert.model';
import { catchError } from '../../../src/utils/catch-error';
import { normalizeConcert } from '../../../src/utils/get-concert/normalize-concert';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../src/models/concert.model');
jest.mock('../../../src/utils/catch-error', () => ({
  catchError: jest.fn((error) => error),
}));
jest.mock('../../../src/utils/get-concert/normalize-concert', () => ({
  normalizeConcert: jest.fn(),
}));

describe('Concert Query Resolver', () => {
  const mockConcertId = '12345';
  const mockConcert = {
    _id: mockConcertId,
    name: 'Test Concert',
    venue: { _id: 'venue123', name: 'Test Venue' },
    seatData: [
      { _id: 'seat1', section: 'A', row: '1', seatNumber: '101' },
      { _id: 'seat2', section: 'B', row: '2', seatNumber: '102' },
    ],
  };
  const normalizedConcert = {
    _id: mockConcertId,
    id: mockConcertId,
    name: 'Test Concert',
    venue: { _id: 'venue123', id: 'venue123', name: 'Test Venue' },
    seatData: [
      { _id: 'seat1', id: 'seat1', section: 'A', row: '1', seatNumber: '101' },
      { _id: 'seat2', id: 'seat2', section: 'B', row: '2', seatNumber: '102' },
    ],
  };
  const mockContext = {};
  const mockInfo = {} as GraphQLResolveInfo;

  beforeEach(() => jest.clearAllMocks());

  it('should return normalized concert when found', async () => {
    const mockPopulate = jest.fn().mockReturnThis();
    const mockExec = jest.fn().mockResolvedValue(mockConcert);
    (concertModel.findById as jest.Mock).mockReturnValue({ populate: mockPopulate, exec: mockExec });
    (normalizeConcert as jest.Mock).mockReturnValue(normalizedConcert);

    const result = await concert?.({}, { concertId: mockConcertId }, mockContext, mockInfo);

    expect(concertModel.findById).toHaveBeenCalledWith(mockConcertId);
    expect(mockPopulate).toHaveBeenCalledWith('venue');
    expect(mockPopulate).toHaveBeenCalledWith('seatData');
    expect(normalizeConcert).toHaveBeenCalledWith(mockConcert);
    expect(result).toEqual(normalizedConcert);
  });

  it('should throw error when concert not found', async () => {
    const mockPopulate = jest.fn().mockReturnThis();
    const mockExec = jest.fn().mockResolvedValue(null);
    (concertModel.findById as jest.Mock).mockReturnValue({ populate: mockPopulate, exec: mockExec });

    await expect(concert?.({}, { concertId: mockConcertId }, mockContext, mockInfo)).rejects.toThrow('Concert not found');
    expect(concertModel.findById).toHaveBeenCalledWith(mockConcertId);
    expect(normalizeConcert).not.toHaveBeenCalled();
  });

  it('should throw error when query fails', async () => {
    const mockError = new Error('DB error');
    const mockPopulate = jest.fn().mockReturnThis();
    const mockExec = jest.fn().mockRejectedValue(mockError);
    (concertModel.findById as jest.Mock).mockReturnValue({ populate: mockPopulate, exec: mockExec });

    await expect(concert?.({}, { concertId: mockConcertId }, mockContext, mockInfo)).rejects.toBe(mockError);
    expect(catchError).toHaveBeenCalledWith(mockError);
    expect(normalizeConcert).not.toHaveBeenCalled();
  });

  describe('normalizeConcert', () => {
    it('should normalize concert with venue and seatData', () => {
      jest.unmock('../../../src/utils/get-concert/normalize-concert');
      const actualNormalize = jest.requireActual('../../../src/utils/get-concert/normalize-concert').normalizeConcert;
      const concertDoc = {
        toObject: () => ({
          _id: mockConcertId,
          name: 'Test Concert',
          venue: { _id: 'venue123', name: 'Test Venue' },
          seatData: [
            { _id: 'seat1', section: 'A', row: '1', seatNumber: '101' },
            { _id: 'seat2', section: 'B', row: '2', seatNumber: '102' },
          ],
        }),
      };

      const result = actualNormalize(concertDoc);
      expect(result).toEqual(normalizedConcert);
    });

    it('should handle falsy seatData, missing venue, and empty seatData', () => {
      jest.unmock('../../../src/utils/get-concert/normalize-concert');
      const actualNormalize = jest.requireActual('../../../src/utils/get-concert/normalize-concert').normalizeConcert;
      const concertDoc = {
        toObject: () => ({
          _id: mockConcertId,
          name: 'Test Concert',
          venue: null,
          seatData: [{ section: 'A', row: '1', seatNumber: '101' }, null, { _id: 'seat2', section: 'B', row: '2', seatNumber: '102' }],
        }),
      };

      const result = actualNormalize(concertDoc);
      expect(result).toEqual({
        _id: mockConcertId,
        id: mockConcertId,
        name: 'Test Concert',
        venue: null,
        seatData: [
          { section: 'A', row: '1', seatNumber: '101' },
          { _id: 'seat2', id: 'seat2', section: 'B', row: '2', seatNumber: '102' },
        ],
      });

      const emptyDoc = { toObject: () => ({ _id: mockConcertId, name: 'Test Concert', venue: null, seatData: [] }) };
      expect(actualNormalize(emptyDoc).seatData).toEqual([]);
    });
  });
});
