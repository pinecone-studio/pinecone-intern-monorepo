import { getUsers } from 'apps/L1FG/instagram/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models', () => ({
  UserModel: {
    find: jest.fn().mockResolvedValue([
      {
        _id: '1',
        userName: 'jordan',
        fullName: 'jordan mike',
        email: 'jordan@gmail.com',
        bio: '',
        password: 'jordan1234',
        isPrivate: false,
        hasStory: false,
        profileImage: 'http://image',
        gender: 'not_know',
      },
    ]),
  },
}));
describe('Get users', () => {
  it('Should take users', async () => {
    if (!getUsers) {
      return;
    }
    const users = await getUsers({}, {}, { userId: '3' }, {} as GraphQLResolveInfo);
    expect(users).toEqual([
      {
        _id: '1',
        userName: 'jordan',
        fullName: 'jordan mike',
        email: 'jordan@gmail.com',
        bio: '',
        password: 'jordan1234',
        isPrivate: false,
        hasStory: false,
        profileImage: 'http://image',
        gender: 'not_know',
      },
    ]);
  });
  it('Should throw an unauthorization error', async () => {
    if (!getUsers) {
      return;
    }
    await expect(getUsers({}, {}, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
});
