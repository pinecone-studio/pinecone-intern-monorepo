import { getNotificationsByUserId } from 'apps/L1AB/Instagram/instagram-backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  notificationsModel: {
    find: jest.fn().mockResolvedValue({ _id: '1', userId: '511', postId: '2', notifiedUserId: '1117', type: 'like', createAt: 'date' }),
  },
}));

describe('getNotificationsByUserId', () => {
  it('it should return', async () => {
    const res = await getNotificationsByUserId!({}, { userId: '1117' }, {}, {} as GraphQLResolveInfo);
    expect(res).toEqual({ _id: '1', userId: '511', postId: '2', notifiedUserId: '1117', type: 'like', createAt: 'date' });
  });
});
