import { PostLikeModal } from '../../../../src/models';
import { makePostLike } from '../../../../src/resolvers/mutations/post/create-post-like-utils/make-post-like';

jest.mock('../../../../src/models');
describe('make post like', () => {
  it('Should throw error', async () => {
    const mockCreate = jest.fn().mockResolvedValueOnce(null);
    PostLikeModal.create = mockCreate;
    const input = {
      userId: '1',
      postId: '2',
    };
    await expect(makePostLike({ input: input })).rejects.toThrow('Постон дээр зүрх дарахад алдаа гарлаа');
    expect(mockCreate).toHaveBeenCalledTimes(1);
  });
  it('SHould successfully create', async () => {
    const mockCreate = jest.fn().mockResolvedValueOnce({
      _id: '12',
      userId: '1',
      postId: '2',
    });
    PostLikeModal.create = mockCreate;
    const input = {
      userId: '1',
      postId: '2',
    };
    const result = await makePostLike({ input: input });
    expect(result).toEqual({
      _id: '12',
      userId: '1',
      postId: '2',
    });
    expect(mockCreate).toHaveBeenCalledTimes(1);
  });
});
