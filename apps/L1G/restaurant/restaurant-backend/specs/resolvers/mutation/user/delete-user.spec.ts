import { GraphQLResolveInfo } from 'graphql';
import { deleteUser } from 'src/resolvers/mutations';

jest.mock('src/models/user.model', () => ({
  UserModel: {
    findOneAndDelete: jest.fn().mockReturnValue({
      _id: '1',
      username: 'Test',
      email: 'test@example.com',
      password: 'test1234',
    }),
  },
}));

describe('deleteUser', () => {
  it('should delete a user', async () => {
    const result = await deleteUser?.({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      username: 'Test',
      email: 'test@example.com',
      password: 'test1234',
    });
  });

  it("should throw an error if the user doesn't exist", async () => {
    try {
      await deleteUser?.({}, { _id: '2' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('User not found'));
    }
  });
});
