import { NotificationModel } from 'apps/L1FG/instagram/backend/src/models';
import { getNotification } from 'apps/L1FG/instagram/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models');

describe('call notification', () => {
  it('find notification', async () => {
    (NotificationModel.find as jest.Mock).mockResolvedValue({
      categoryType: 'POST',
      userId: '1',
      ownerId: '2',
      contentPostId: '11',
      contentCommentId: '22',
      contentStoryId: '33',
      isRead: false,
      createdAt: '2',
      updatedAt: '2',
    });

    if (!getNotification) return;

    const result = await getNotification({}, {}, { userId: '2' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      categoryType: 'POST',
      userId: '1',
      ownerId: '2',
      contentPostId: '11',
      contentCommentId: '22',
      contentStoryId: '33',
      isRead: false,
      createdAt: '2',
      updatedAt: '2',
    });
  });
});
