import { PostLikeModal } from '../../../../src/models';
import { hasLiked } from '../../../../src/resolvers/post/user-post-type';

jest.mock('../../../../src/models');
describe('Has liked', () => {
  it('Should get true', async () => {
    (PostLikeModal.findOne as jest.Mock).mockResolvedValue({
      _id: '12',
      userId: '31',
      postId: '4rq',
    });
    const result = await hasLiked({ _id: 'e' }, {}, { userId: 'er' });
    expect(result).toBe(true);
  });
  it('Should get false', async () => {
    (PostLikeModal.findOne as jest.Mock).mockResolvedValue(null);
    const result = await hasLiked({ _id: 'e' }, {}, { userId: 'er' });
    expect(result).toBe(false);
  });
});
