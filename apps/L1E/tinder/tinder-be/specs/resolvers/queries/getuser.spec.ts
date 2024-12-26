import { GraphQLResolveInfo } from 'graphql';
import { getUserById } from '../../../src/resolvers/queries/profileUser/get-user';

jest.mock('../../../src/models/user/user.model.ts', () => ({
  userModel: {
    findById: jest.fn().mockResolvedValueOnce({ id: '123', name: 'Test User' }).mockResolvedValueOnce(null),
  },
}));

describe('getUserById', () => {
  it('should get user by id', async () => {
    const result = await getUserById!(
      {},
      { userId: '123' },
      {
        req: undefined,
      },
      {} as GraphQLResolveInfo
    );
    expect(result).toEqual({ id: '123', name: 'Test User' });
  });

  it('should throw an error when userId is not provided', async () => {
    try {
      await getUserById!(
        {},
        {
          userId: '123',
        },
        {
          req: undefined,
        },
        {} as GraphQLResolveInfo
      );
    } catch (error) {
      expect(error);
    }
  });

  it('should throw an error when user is not found', async () => {
    try {
      await getUserById!({}, { userId: '999' }, { req: undefined }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error);
    }
  });
});