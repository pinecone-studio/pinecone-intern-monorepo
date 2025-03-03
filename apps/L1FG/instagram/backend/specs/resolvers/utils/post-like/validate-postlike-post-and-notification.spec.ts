import { PostLikeModal, PostModel } from '../../../../src/models';
import { validatePostlikePostAndNotification } from '../../../../src/resolvers/mutations/post/delete-post-like-utils/validate-postlike-post-and-notification';
jest.mock('../../../../src/models');
describe('Validate postlike ,post and notification', () => {
  it('Should throw пост олдсонгүй', async () => {
    const mockFindById = jest.fn().mockResolvedValueOnce(null);
    (PostModel.findById as jest.Mock) = mockFindById;
    const input = {
      postId: '4',
      userId: '33',
    };
    await expect(validatePostlikePostAndNotification({ input: input })).rejects.toThrow('пост олдсонгүй');
  });
  it('Should throw постон дээр зүрх дараагүй байна', async () => {
    const mockPostlikeFindOne = jest.fn().mockResolvedValueOnce(null);
    (PostLikeModal.findById as jest.Mock) = mockPostlikeFindOne;
    const mockFindById = jest.fn().mockResolvedValueOnce({});
    (PostModel.findById as jest.Mock) = mockFindById;
    const input = {
      postId: '4',
      userId: '33',
    };
    await expect(validatePostlikePostAndNotification({ input: input })).rejects.toThrow('постон дээр зүрх дараагүй байна');
  });
});
