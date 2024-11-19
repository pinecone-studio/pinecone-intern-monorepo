import { getUserById } from 'apps/L1AB/hotel-booking/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findById: jest.fn().mockResolvedValueOnce({ _id: '2' }).mockRejectedValueOnce(''),
  },
}));

describe('get user by id', () => {
  it('should get user by id succesfully', async () => {
    const result = await getUserById!({}, { _id: '2' }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({ _id: '2' });
  });

  it('should throw an error', async () => {
    try {
      await getUserById!({}, { _id: '2' }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
        expect(error).toEqual(new Error('Failed to get user by id 2'));
    }
  });
});
