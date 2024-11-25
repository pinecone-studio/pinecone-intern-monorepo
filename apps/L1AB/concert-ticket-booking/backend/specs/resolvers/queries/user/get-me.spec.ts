import { getMe } from 'apps/L1AB/concert-ticket-booking/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findById: jest.fn().mockResolvedValueOnce({ id: '123', name: 'Test User' }).mockResolvedValueOnce(null),
  },
}));

describe('getMe', () => {
  it('should get user by id', async () => {
    const user = { userId: '123' };
    const result = await getMe!({}, {}, { user }, {} as GraphQLResolveInfo);
    expect(result).toEqual({ id: '123', name: 'Test User' });
  });

  it('should throw an error when userId is not provided', async () => {
    try {
      await getMe!({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Unauthorized: No user found in context.'));
    }
  });

  it('should throw an error when user is not found', async () => {
    const user = { userId: '999' };
    try {
      await getMe!({}, {}, { user }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('User not found.'));
    }
  });
});
