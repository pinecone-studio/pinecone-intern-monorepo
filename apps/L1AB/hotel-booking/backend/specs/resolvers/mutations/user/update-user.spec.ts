import { updateUser } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations/user/update-user';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockResolvedValueOnce({
        _id: "1",
        email: 'test@gmail.com',
      })
      .mockRejectedValueOnce(''),
  },
}));

describe('Update user', () => {
  it('should update a user successfully', async () => {
    const result = await updateUser!({}, { input: { _id: "1", email: 'test@gmail.com' } }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: "1",
      email: 'test@gmail.com',
    });
  });

  it('should return error when there is a failure in updating the user', async () => {
    try {
      await updateUser!({}, { input: { _id: "1", email: 'test@gmail.com' } }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Failed to update user'));
    }
  });
});
