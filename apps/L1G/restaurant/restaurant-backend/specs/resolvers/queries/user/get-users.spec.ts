import { GraphQLResolveInfo } from 'graphql';
import { UserModel } from 'src/models/user.model';
import { getUsers } from 'src/resolvers/queries';

jest.mock('src/models/user.model', () => ({
  UserModel: {
    find: jest.fn().mockReturnValue([
      {
        userId: '1',
        username: 'Test',
        email: 'test@example.com',
        password: 'test1234',
      },
      {
        userId: '2',
        username: 'Test2',
        email: 'test2@example.com',
        password: 'test1234',
      },
    ]),
  },
}));

describe('get Users', () => {
  it('should get a users', async () => {
    const result = await getUsers?.({}, {}, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual([
      {
        userId: '1',
        username: 'Test',
        email: 'test@example.com',
        password: 'test1234',
      },
      {
        userId: '2',
        username: 'Test2',
        email: 'test2@example.com',
        password: 'test1234',
      },
    ]);
  });

  it('should throw an error if no users exist', async () => {
    (UserModel.find as jest.Mock).mockResolvedValueOnce(null);

    await expect(getUsers?.({}, {}, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Users not found');
  });
});
