import { PostLikeModal, PostModel } from '../../../../src/models';
import { updatePostLike } from '../../../../src/resolvers/mutations/post/create-post-like-utils/update-post-like';
jest.mock('../../../../src/models');
describe('Post update like', () => {
  it('Should throw an error', async () => {
    const mockFindByIdAndUpdate = jest.fn(() => {
      throw new Error('Database error');
    });
    const mockFindByIdAndDelete = jest.fn().mockResolvedValueOnce({
      _id: '1',
      userName: 'john',
    });
    (PostModel.findByIdAndUpdate as jest.Mock) = mockFindByIdAndUpdate;
    (PostLikeModal.findByIdAndDelete as jest.Mock) = mockFindByIdAndDelete;
    await expect(
      updatePostLike({
        input: {
          postId: '1',
        },
        postLike: {
          _id: '1',
          postId: '2',
          userId: '3',
        },
      })
    ).rejects.toThrow('Server error');
    expect(mockFindByIdAndDelete).toHaveBeenCalledTimes(1);
    expect(mockFindByIdAndDelete).toHaveBeenCalledTimes(1);
  });
});
