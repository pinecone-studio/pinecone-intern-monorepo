import { getUser } from 'apps/L1FG/instagram/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('apps/L1FG/instagram/backend/src/models', () => ({
  UserModel: {
    findById: jest.fn().mockResolvedValue({
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
    }),
  },
}));
describe('getUser', () => {
  it('Should throw unauthorized error', async () => {
    if (!getUser) {
      return;
    }
    await expect(getUser({}, {}, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
  it('Should give user', async () => {
    if (!getUser) {
      return;
    }
    await expect(getUser({}, {}, { userId: '12' }, {} as GraphQLResolveInfo)).resolves.toEqual({
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
    });
  });
});
