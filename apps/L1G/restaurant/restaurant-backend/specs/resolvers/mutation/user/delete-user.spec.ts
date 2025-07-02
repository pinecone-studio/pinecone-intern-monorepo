import { GraphQLResolveInfo } from 'graphql';
import { deleteUser } from 'src/resolvers/mutations';
import { UserModel } from 'src/models/user.model';

jest.mock('src/models/user.model', () => ({
  UserModel: {
    findByIdAndDelete: jest.fn().mockResolvedValue({
      userId: '1',
      email: 'test@example.com',
      password: 'test1234',
    }),
  },
}));

describe('deleteUser', () => {
  it('should delete a user', async () => {
    const result = await deleteUser?.({}, { userId: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      userId: '1',
      email: 'test@example.com',
      password: 'test1234',
    });
  });

  it("should throw an error if the user doesn't exist", async () => {
    (UserModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await expect(deleteUser?.({}, { userId: '2' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('User with ID 2 not found');

    expect(UserModel.findByIdAndDelete).toHaveBeenCalledWith('2');
  });
});
