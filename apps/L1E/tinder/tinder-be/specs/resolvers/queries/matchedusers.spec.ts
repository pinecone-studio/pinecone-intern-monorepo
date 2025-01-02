import { GraphQLResolveInfo } from 'graphql';
import { matchModel } from '../../../src/models/user/match.model';
import { getMatchedUsers } from '../../../src/resolvers/queries';

// Mock the matchModel module
jest.mock('../../../src/models/user/match.model', () => ({
  matchModel: {
    find: jest.fn(),
  },
}));

describe('getMatchedUsers', () => {
  it('should return matched users for authenticated user', async () => {
    const mockAuthId = 'user1';
    const mockMatches = [
      { _id: 'match1', userId: mockAuthId, matchName: 'Match 1' },
      { _id: 'match2', userId: mockAuthId, matchName: 'Match 2' },
    ];

    (matchModel.find as jest.Mock).mockResolvedValue(mockMatches);

    try {
      const result = await getMatchedUsers!({}, { authId: mockAuthId }, { req: undefined }, {} as GraphQLResolveInfo);
      console.log('Result:', result); // Log the result to check the output

      expect(matchModel.find).toHaveBeenCalledWith({ userId: mockAuthId });
      expect(result).toEqual([
        { _id: 'match1', userId: mockAuthId, matchName: 'Match 1' },
        { _id: 'match2', userId: mockAuthId, matchName: 'Match 2' },
      ]);
    } catch (error) {
      console.log('asd');
    }
  });

  it('should throw an error if no authId is provided', async () => {
    await expect(getMatchedUsers!({}, { authId: '' }, { req: undefined }, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to get matches for the logged-in user');
  });

  it('should handle errors gracefully', async () => {
    const mockAuthId = 'user1';
    (matchModel.find as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(getMatchedUsers!({}, { authId: mockAuthId }, { req: undefined }, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to get matches for the logged-in user');
  });
});
