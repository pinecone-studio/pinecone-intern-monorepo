import { NotificationModel } from 'apps/L1FG/instagram/backend/src/models';
import { getNotification } from 'apps/L1FG/instagram/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models', () => ({
  NotificationModel: {
    find: jest.fn(),
  },
}));

describe('getNotification Resolver', () => {
  const mockUserId = 'user123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockNotificationsEarlier = [
    { categoryType: 'POST_LIKE', createdAt: '2024-01-01T10:00:00.000Z', ownerId: 'user123' },
    { categoryType: 'COMMENT_POST', createdAt: '2024-01-02T10:00:00.000Z', ownerId: 'user123' },
    { categoryType: 'REQUEST', createdAt: '2024-01-03T10:00:00.000Z', ownerId: 'user123' },
  ];

  it('should correctly categorize notifications', async () => {
    const mockNotification = {
      comment: [],
      postLike: [],
      request: [],
    };

    const now = new Date();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const mockNotifications = [
      { createdAt: now, ownerId: mockUserId },
      { createdAt: new Date(weekAgo.getTime() + 1000), ownerId: mockUserId },
      { createdAt: new Date(todayStart.getTime() - 15 * 24 * 60 * 60 * 1000), ownerId: 'user123' }, // Earlier
      { createdAt: new Date(weekAgo.getTime() - 1000), ownerId: mockUserId },
      ...mockNotificationsEarlier,
    ];

    (NotificationModel.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockNotifications),
    });

    if (!getNotification) return;

    const result = await getNotification({}, {}, { userId: mockUserId }, {} as GraphQLResolveInfo);
    console.log('earlier:', result.earlier);

    expect(result.today).toEqual(mockNotification);
    expect(result.thisWeek).toEqual(mockNotification);
    expect(result.monthAgo).toEqual(mockNotification);
    expect(result.earlier).toEqual({
      postLike: [{ categoryType: 'POST_LIKE', createdAt: '2024-01-01T10:00:00.000Z', ownerId: 'user123' }],
      comment: [{ categoryType: 'COMMENT_POST', createdAt: '2024-01-02T10:00:00.000Z', ownerId: 'user123' }],
      request: [{ categoryType: 'REQUEST', createdAt: '2024-01-03T10:00:00.000Z', ownerId: 'user123' }],
    });
  });
});
