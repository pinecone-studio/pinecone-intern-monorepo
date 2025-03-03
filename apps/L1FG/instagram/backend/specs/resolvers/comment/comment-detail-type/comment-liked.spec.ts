import { CommentLikeModel } from '../../../../src/models';
import { commentLiked } from '../../../../src/resolvers/comment/comment-detail-type';
// eslint-disable-next-line no-unused-vars
import { authenticate } from '../../../../src/utils/authenticate';
jest.mock('../../../../src/utils/authenticate');
describe('Comment liked', () => {
  it('Should throw an authorization error', async () => {
    const mockAuthenticate = jest.fn(() => {
      throw new Error('Та нэвтэрнэ үү!');
    });
    (authenticate as jest.Mock) = mockAuthenticate;
    await expect(commentLiked({ _id: '12' }, {}, { userId: null })).rejects.toThrow('Та нэвтэрнэ үү!');
    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
  });
  it('Should return boolean false', async () => {
    const mockAuthenticate = jest.fn().mockResolvedValue(null);
    const mockFind = jest.fn().mockResolvedValue(null);
    (authenticate as jest.Mock) = mockAuthenticate;
    (CommentLikeModel.findOne as jest.Mock) = mockFind;
    const result = await commentLiked({ _id: '12' }, {}, { userId: '134' });
    expect(result).toBe(false);
  });
  it('Should return boolen true', async () => {
    const mockAuthenticate = jest.fn().mockResolvedValue(null);
    const mockFind = jest.fn().mockResolvedValue({});
    (authenticate as jest.Mock) = mockAuthenticate;
    (CommentLikeModel.findOne as jest.Mock) = mockFind;
    const result = await commentLiked({ _id: '12' }, {}, { userId: '134' });
    expect(result).toBe(true);
  });
});
