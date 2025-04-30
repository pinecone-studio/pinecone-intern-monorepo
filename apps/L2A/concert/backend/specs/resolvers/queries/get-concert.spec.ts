import { GraphQLResolveInfo } from 'graphql';
import { concertModel } from '../../../src/models/concert.model';
import { concertQuery } from '../../../src/resolvers/queries';

jest.mock('../../../src/models/concert.model', () => ({
  concertModel: {
    findOne: jest.fn(),
  },
}));

const context = {};
const info = {} as GraphQLResolveInfo;
const args = {
  id: 'concert123',
  title: 'Test Concert',
  venue: {
    id: 'venue123',
    name: 'Test Venue',
  },
};

describe('concertQuery resolver', () => {
  it('should return a concert with populated venue', async () => {
    const mockConcert = {
      id: 'concert123',
      title: 'Test Concert',
      venue: {
        id: 'venue123',
        name: 'Test Venue',
      },
    };
    const execMock = jest.fn().mockResolvedValue(mockConcert);
    const populateMock = jest.fn().mockReturnValue({ exec: execMock });
    (concertModel.findOne as jest.Mock).mockReturnValue({ populate: populateMock });

    const result = await concertQuery?.({}, args, context, info);

    expect(concertModel.findOne).toHaveBeenCalled();
    expect(populateMock).toHaveBeenCalledWith('venue');
    expect(result).toEqual(mockConcert);
  });

  it('should handle errors', async () => {
    const error = new Error('Something went wrong');
    const execMock = jest.fn().mockRejectedValue(error);
    const populateMock = jest.fn().mockReturnValue({ exec: execMock });
    (concertModel.findOne as jest.Mock).mockReturnValue({ populate: populateMock });

    await expect(concertQuery?.({}, args, context, info)).rejects.toThrow('Something went wrong');
  });
});
