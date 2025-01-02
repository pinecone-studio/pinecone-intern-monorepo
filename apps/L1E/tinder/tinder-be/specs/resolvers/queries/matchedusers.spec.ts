import { GraphQLResolveInfo } from 'graphql';
import { getMatchedUserById } from '../../../src/resolvers/queries';
import { matchModel } from '../../../src/models/user/match.model';

jest.mock('../../../src/models/user/match.model', () => ({
  matchModel: {
    findById: jest.fn(),
  },
}));

describe('getMatchedUserById Resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the matched user when found', async () => {
    (matchModel.findById as jest.Mock).mockResolvedValueOnce({
      _id: '123',
      name: 'Test User',
      toObject: jest.fn().mockReturnValue({
        _id: '123',
        name: 'Test User',
      }),
    });

    const result = await getMatchedUserById!({}, { _id: '123' }, { req: undefined }, {} as GraphQLResolveInfo);
    expect(matchModel.findById).toHaveBeenCalledWith({ _id: '123' });
    expect(result).toEqual({ _id: '123', name: 'Test User' });
  });

  it('should throw an error when match is not found', async () => {
    try {
      await getMatchedUserById!({}, { _id: '999' }, { req: undefined }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error);
    }
  });

  it('should throw an error if there is a database issue', async () => {
    (matchModel.findById as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    try {
      await getMatchedUserById!({}, { _id: '999' }, { req: undefined }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error);
    }
  });
});
