import { createFollower } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models', () => ({
  FollowerModel: {
    create: jest.fn().mockReturnValue({
      _id: 'hi',
      followerId: 'fol',
      targetId: 'tar',
    }),
  },
}));

describe('Follow', () => {
  it('Should create a follower', async () => {
    if (!createFollower) {
      return;
    }
    const input = {
      followerId: '',
      targetId: '',
    };

    const result = await createFollower({}, { input }, { userId: '123' }, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: 'hi',
      followerId: 'fol',
      targetId: 'tar',
    });
  });
  it('Should throw an unauthorized error', async () => {
    if (!createFollower) {
      return;
    }
    const input = {
      followerId: '',
      targetId: '',
    };
    await expect(createFollower({}, { input }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
});
