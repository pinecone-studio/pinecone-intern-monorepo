import { NotificationModel } from '../../../../src/models';
import { getNotification } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models', () => ({
  NotificationModel: {
    aggregate: jest.fn(),
  },
}));

describe('getNotification', () => {
  it('should return correct notification data for today', async () => {
    const mockData = [
      {
        _id: 'today',
        postLike: [{ createdAt: '2025-02-07T12:00:00Z', categoryType: 'POST_LIKE' }],
        comment: [{ createdAt: '2025-02-07T12:00:00Z', categoryType: 'POST_LIKE' }],
        request: [{ createdAt: '2025-02-07T12:00:00Z', categoryType: 'POST_LIKE' }],
        commentLike: [{ createdAt: '2025-02-07T12:00:00Z', categoryType: 'POST_LIKE' }],
      },
    ];

    (NotificationModel.aggregate as jest.Mock).mockResolvedValue(mockData);
    if (!getNotification) return;

    const response = await getNotification({}, {}, { userId: '678e1e9179fd42a3a41c8dfe' }, {} as GraphQLResolveInfo);

    expect(response?.today?.postLike).toEqual([{ categoryType: 'POST_LIKE', createdAt: '2025-02-07T12:00:00Z' }]);
    expect(response?.today?.comment).toEqual([{ categoryType: 'POST_LIKE', createdAt: '2025-02-07T12:00:00Z' }]);
    expect(response?.today?.request).toEqual([{ categoryType: 'POST_LIKE', createdAt: '2025-02-07T12:00:00Z' }]);
    expect(response?.today?.commentLike).toEqual([{ categoryType: 'POST_LIKE', createdAt: '2025-02-07T12:00:00Z' }]);
  });

  it('should return undefined for empty arrays', async () => {
    const mockData = [
      {
        _id: 'today',
        postLike: [],
        comment: [],
        request: [],
        commentLike: [],
      },
      {
        _id: 'thisWeek',
        postLike: [],
        comment: [],
        request: [],
        commentLike: [],
      },
    ];

    (NotificationModel.aggregate as jest.Mock).mockResolvedValue(mockData);

    if (!getNotification) return;

    const response = await getNotification({}, {}, { userId: '678e1e9179fd42a3a41c8dfe' }, {} as GraphQLResolveInfo);

    expect(response?.today?.postLike).toBeNull();
    expect(response?.today?.comment).toBeNull();
    expect(response?.today?.request).toBeNull();
    expect(response?.today?.commentLike).toBeNull();
    expect(response?.thisWeek?.postLike).toBeNull();
    expect(response?.thisWeek?.comment).toBeNull();
    expect(response?.thisWeek?.request).toBeNull();
    expect(response?.thisWeek?.commentLike).toBeNull();
  });

  it("haven't userId", async () => {
    if (!getNotification) return;

    await expect(getNotification({}, {}, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('UnAuthorized');
  });
});
