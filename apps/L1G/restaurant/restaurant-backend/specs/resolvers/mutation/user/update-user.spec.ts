import { GraphQLResolveInfo } from 'graphql';
import { updateUser } from 'src/resolvers/mutations';
import { UserModel } from 'src/models/user.model';

jest.mock('src/models/user.model', () => ({
  UserModel: {
    findByIdAndUpdate: jest.fn().mockReturnValue({
      userId: '1',
      email: 'test@example.com',
      password: 'test1234',
      username: 'Test',
      phoneNumber: '1234567890',
      profile: 'profile.jpg',
    }),
  },
}));

describe('updateUser', () => {
  it('should update a user', async () => {
    const result = await updateUser?.(
      {},
      {
        userId: '1',
        input: {
          email: 'test@example.com',
          password: 'test1234',
          username: 'Test',
          phoneNumber: '1234567890',
          profile: 'profile.jpg',
        },
      },
      {},
      {} as GraphQLResolveInfo
    );
    expect(result).toEqual({
      userId: '1',
      email: 'test@example.com',
      password: 'test1234',
      username: 'Test',
      phoneNumber: '1234567890',
      profile: 'profile.jpg',
    });
  });

  it("should throw an error if the user doesn't exist", async () => {
    (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(updateUser?.({}, { userId: '2', input: { phoneNumber: '1234567890', email: 'test@example.com', password: 'test1234' } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(
      'User with ID 2 not found'
    );

    expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith('2', { $set: { phoneNumber: '1234567890', email: 'test@example.com', password: 'test1234' } }, { new: true, runValidators: true });
  });
});
