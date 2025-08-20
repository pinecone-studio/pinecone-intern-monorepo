import { GraphQLResolveInfo } from 'graphql';
import { updateUser } from 'src/resolvers/mutations';
import { UserModel } from 'src/models/user.model';

jest.mock('src/models/user.model', () => ({
  UserModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('mockHashedPassword'),
}));

describe('updateUser', () => {
  beforeEach(() => {
    (UserModel.findByIdAndUpdate as jest.Mock).mockReset();
  });

  it('should update a user', async () => {
    (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
      userId: '1',
      email: 'test@example.com',
      password: 'mockHashedPassword',
      username: 'Test',
      phoneNumber: '1234567890',
      profile: 'profile.jpg',
    });

    const result = await updateUser?.(
      {},
      {
        userId: '1',
        input: {
          email: 'test@example.com',
          password: 'plainPassword',
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
      password: 'mockHashedPassword',
      username: 'Test',
      phoneNumber: '1234567890',
      profile: 'profile.jpg',
    });

    expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(
      '1',
      {
        $set: {
          email: 'test@example.com',
          password: 'mockHashedPassword',
          username: 'Test',
          phoneNumber: '1234567890',
          profile: 'profile.jpg',
        },
      },
      { new: true, runValidators: true }
    );
  });

  it("should throw an error if the user doesn't exist", async () => {
    (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(
      updateUser?.(
        {},
        {
          userId: '2',
          input: {
            email: 'test@example.com',
            password: 'anotherPassword',
            username: 'Test',
            phoneNumber: '1234567890',
            profile: 'profile.jpg',
          },
        },
        {},
        {} as GraphQLResolveInfo
      )
    ).rejects.toThrow('User with ID 2 not found');
  });
});
