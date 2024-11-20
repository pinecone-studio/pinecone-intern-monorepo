import { deleteUser } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations/user/delete-user';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findByIdAndDelete: jest
      .fn()
      .mockResolvedValueOnce({ _id: '1', email: 'test@example.com' })
      .mockResolvedValueOnce(null)
      .mockRejectedValueOnce(new Error('Database error')), 
  },
}));

describe('Delete User', () => {
  it('should delete a user successfully', async () => {
    const result = await deleteUser!({}, { _id: '1' }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      success: true,
      message: 'User successfully deleted',
    });
  });

  it("should return an error if the user doesn't exist", async () => {
    const result = await deleteUser!({}, { _id: '1' }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      success: false,
      message: 'User not found',
    });
  });

  it('should throw an error on database failure', async () => {
    try {
      await deleteUser!({}, { _id: '1' }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Failed to delete user'));
    }
  });
});
