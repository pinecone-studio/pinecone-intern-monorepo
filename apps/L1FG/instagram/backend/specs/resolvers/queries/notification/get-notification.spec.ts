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

  it('should correctly categorize notifications', async () => {
    const now = new Date();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const mockNotifications = [
      { createdAt: now, ownerId: mockUserId },
      { createdAt: new Date(yesterdayStart.getTime() + 1000), ownerId: mockUserId },
      { createdAt: new Date(weekAgo.getTime() + 1000), ownerId: mockUserId },
      { createdAt: new Date(weekAgo.getTime() - 1000), ownerId: mockUserId },
    ];

    (NotificationModel.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockNotifications),
    });

    if (!getNotification) return;

    const result = await getNotification({}, {}, { userId: mockUserId }, {} as GraphQLResolveInfo);

    expect(result.today).toHaveLength(1);
    expect(result.yesterday).toHaveLength(1);
    expect(result.thisWeek).toHaveLength(2);
    expect(result.earlier).toHaveLength(1);
  });
});
