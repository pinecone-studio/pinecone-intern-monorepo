import { NotificationModel } from 'apps/L1FG/instagram/backend/src/models';
import { updateIsRead } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';
const mockData = {
  _id: 'today',
  postLike: [{ createdAt: '2025-02-07T12:00:00Z', categoryType: 'POST_LIKE' }],
  comment: [{ createdAt: '2025-02-07T12:00:00Z', categoryType: 'POST_LIKE' }],
  request: [{ createdAt: '2025-02-07T12:00:00Z', categoryType: 'POST_LIKE' }],
  commentLike: [{ createdAt: '2025-02-07T12:00:00Z', categoryType: 'POST_LIKE' }],
};

jest.mock('apps/L1FG/instagram/backend/src/models');

describe('update notification', () => {
  it('find and update many notification model', async () => {
    (NotificationModel.findOne as jest.Mock).mockResolvedValue(mockData);

    if (!updateIsRead) return;

    await expect(updateIsRead({}, {}, { userId: '2' }, {} as GraphQLResolveInfo));
  });

  it('find and update many notification model', async () => {
    (NotificationModel.findOne as jest.Mock).mockResolvedValue(undefined);

    if (!updateIsRead) return;

    const result = await updateIsRead({}, {}, { userId: '2' }, {} as GraphQLResolveInfo);

    expect(result).toEqual({ isRead: false });
  });

  it('find and update many notification model', async () => {
    (NotificationModel.updateMany as jest.Mock).mockResolvedValue({ isRead: true });

    if (!updateIsRead) return;

    await expect(updateIsRead({}, {}, { userId: '2' }, {} as GraphQLResolveInfo));
  });
});
