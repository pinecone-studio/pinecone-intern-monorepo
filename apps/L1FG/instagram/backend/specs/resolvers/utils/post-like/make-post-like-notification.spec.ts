import { NotificationModel, PostLikeModal } from 'apps/L1FG/instagram/backend/src/models';
import { makePostLikeNotification } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/post/create-post-like-utils/make-post-like-notification';
jest.mock('apps/L1FG/instagram/backend/src/models');
describe('Make post like notification', () => {
  it('Should throw error', async () => {
    const mockCreate = jest.fn(() => {
      throw new Error('Database error');
    });
    const mockFindByIdAndDelete = jest.fn().mockResolvedValue(null);
    (NotificationModel.create as jest.Mock) = mockCreate;
    (PostLikeModal.findByIdAndDelete as jest.Mock) = mockFindByIdAndDelete;
    await expect(
      makePostLikeNotification({
        input: {
          userId: '3',
          ownerUserId: '2',
          postId: '1',
        },
        postLike: {
          _id: '1',
          postId: '2',
          userId: '3',
        },
      })
    ).rejects.toThrow('Server error');
  });
});
