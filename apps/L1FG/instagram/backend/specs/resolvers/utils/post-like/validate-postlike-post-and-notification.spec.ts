import { PostLikeModal, PostModel } from 'apps/L1FG/instagram/backend/src/models';
import { validatePostlikePostAndNotification } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/post/delete-post-like-utils/validate-postlike-post-and-notification';
jest.mock('apps/L1FG/instagram/backend/src/models');
describe('Validate postlike ,post and notification', () => {
  it('Should throw пост олдсонгүй', async () => {
    const mockPostlikeFindById = jest.fn().mockResolvedValueOnce({});
    (PostLikeModal.findById as jest.Mock) = mockPostlikeFindById;
    const mockFindById = jest.fn().mockResolvedValueOnce(null);
    (PostModel.findById as jest.Mock) = mockFindById;
    const input = {
      postId: '4',
      ownerUserId: '33',
    };
    await expect(validatePostlikePostAndNotification({ input: input })).rejects.toThrow('пост олдсонгүй');
  });
});
