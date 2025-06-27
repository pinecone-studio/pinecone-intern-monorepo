import { GraphQLResolveInfo } from 'graphql';
import { updateUser } from 'src/resolvers/mutations';

jest.mock('src/models/user.model', () => ({
  UserModel: {
    findOneAndUpdate: jest.fn().mockReturnValue({
      _id: '1',
      username: 'Test',
      email: 'test@example.com',
      password: 'test1234',
    }),
  },
}));

describe('updateUser', () => {
  it('should update a user', async () => {
    const result = await updateUser?.({}, { _id: '1', username: 'Test', email: 'test@example.com', password: 'test1234' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      username: 'Test',
      email: 'test@example.com',
      password: 'test1234',
    });
  });

  it("should throw an error if the user doesn't exist", async () => {
    try {
      await updateUser?.({}, { _id: '2', username: 'Test', email: 'test@example.com', password: 'test1234' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('User not found'));
    }
  });
});
