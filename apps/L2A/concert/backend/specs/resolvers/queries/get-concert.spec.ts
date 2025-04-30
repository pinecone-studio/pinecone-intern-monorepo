import { GraphQLResolveInfo } from 'graphql';
import { concertModel } from '../../../src/models/concert.model';
import { concert } from '../../../src/resolvers/queries';
import { catchError } from '../../../src/utils/catch-error';

jest.mock('../../../src/models/concert.model', () => ({
  concertModel: {
    findById: jest.fn(),
  },
}));

jest.mock('../../../src/utils/catch-error', () => ({
  catchError: jest.fn(),
}));

const context = {};
const info = {} as GraphQLResolveInfo;
const args = {
  concertId: 'concert123',
};

describe('concert Resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a concert with populated venue', async () => {
    const mockConcert = {
      _id: 'concert123',
      title: 'Test Concert',
      venue: {
        _id: 'venue123',
        name: 'Test Venue',
      },
    };
    const execMock = jest.fn().mockResolvedValue(mockConcert);
    const populateMock = jest.fn().mockReturnValue({ exec: execMock });
    (concertModel.findById as jest.Mock).mockReturnValue({ populate: populateMock });

    const result = await concert?.({}, args, context, info);

    expect(concertModel.findById).toHaveBeenCalledWith(args.concertId);
    expect(populateMock).toHaveBeenCalledWith('venue');
    expect(execMock).toHaveBeenCalled();
    expect(result).toEqual(mockConcert);
    expect(result).toHaveProperty('title', 'Test Concert');
    expect(result?.venue).toHaveProperty('name', 'Test Venue');
  });

  it('should return null if concert is not found', async () => {
    const execMock = jest.fn().mockResolvedValue(null);
    const populateMock = jest.fn().mockReturnValue({ exec: execMock });
    (concertModel.findById as jest.Mock).mockReturnValue({ populate: populateMock });

    const result = await concert?.({}, args, context, info);

    expect(concertModel.findById).toHaveBeenCalledWith(args.concertId);
    expect(populateMock).toHaveBeenCalledWith('venue');
    expect(execMock).toHaveBeenCalled();
    expect(result).toBeNull();
    expect(catchError).not.toHaveBeenCalled();
  });

  it('should handle errors with catchError', async () => {
    const error = new Error('Database connection failed');
    const execMock = jest.fn().mockRejectedValue(error);
    const populateMock = jest.fn().mockReturnValue({ exec: execMock });
    (concertModel.findById as jest.Mock).mockReturnValue({ populate: populateMock });

    const result = await concert?.({}, args, context, info);

    expect(concertModel.findById).toHaveBeenCalledWith(args.concertId);
    expect(populateMock).toHaveBeenCalledWith('venue');
    expect(execMock).toHaveBeenCalled();
    expect(catchError).toHaveBeenCalledWith(error);
    expect(result).toBeUndefined();
  });
});
