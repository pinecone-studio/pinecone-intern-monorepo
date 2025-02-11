import { NotificationModel, PostModel } from 'apps/L1FG/instagram/backend/src/models';
import { validatePostlikePostAndNotification } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/post/delete-post-like-utils/validate-postlike-post-and-notification';
jest.mock('apps/L1FG/instagram/backend/src/models');
describe('Validate postlike ,post and notification', () => {
  it('Should throw пост олдсонгүй', async () => {
    const mockFindById = jest.fn().mockResolvedValueOnce(null);
    (PostModel.findById as jest.Mock) = mockFindById;
    const input = {
      postLikeid: '1',
      postId: '4',
      notificationId: '5',
    };
    await expect(validatePostlikePostAndNotification({ input: input })).rejects.toThrow('пост олдсонгүй');
  });
  it('Should throw мэдээлэл олдсонгүй', async () => {
    const mockFindById = jest.fn().mockResolvedValueOnce({
      _id: '12',
      caption: 'hi',
    });
    const mockNotificationFindById = jest.fn().mockResolvedValueOnce(null);
    (PostModel.findById as jest.Mock) = mockFindById;
    (NotificationModel.findById as jest.Mock) = mockNotificationFindById;
    const input = {
      postLikeid: '1',
      postId: '4',
      notificationId: '5',
    };
    await expect(validatePostlikePostAndNotification({ input: input })).rejects.toThrow('мэдээлэл олдсонгүй');
  });
});
