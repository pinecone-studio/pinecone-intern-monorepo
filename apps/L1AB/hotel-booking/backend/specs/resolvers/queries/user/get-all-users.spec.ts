import { getAllUsers } from 'apps/L1AB/hotel-booking/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  userModel: {
    find: jest.fn().mockResolvedValueOnce({ _id: '1', email: 'test@gmail.com' }).mockRejectedValueOnce('Failed to get all users'),
  },
}));

describe('get all users', () => {
  it('should get all users succesfully', async () => {
    const result = await getAllUsers!({}, {}, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({ _id: '1', email: 'test@gmail.com' });
  });

  it('should throw an error', async () => {
    try {
      await getAllUsers!({}, {}, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Failed to get all users');
      }
    }
  });
});
