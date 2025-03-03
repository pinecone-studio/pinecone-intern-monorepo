import { PostLikeModal } from '../../../../src/models';
import { checkPostLikeExists } from '../../../../src/resolvers/mutations/post/create-post-like-utils/check-post-like-exists';

jest.mock('apps/L1FG/instagram/backend/src/models');

describe('Check post like exists', () => {
  it('Should throw error', async () => {
    const mockFindOne = jest.fn().mockResolvedValueOnce({
      _id: '1',
      userId: '1',
      postId: '1',
    });
    (PostLikeModal.findOne as jest.Mock) = mockFindOne;
    await expect(checkPostLikeExists({ input: { postId: '1', userId: '1' } })).rejects.toThrow('Постон дээр зүрх дарсан байна');
  });
});
