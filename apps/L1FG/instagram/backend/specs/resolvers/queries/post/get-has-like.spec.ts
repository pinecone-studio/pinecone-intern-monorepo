import { PostLikeModal } from 'apps/L1FG/instagram/backend/src/models';

jest.mock('apps/L1FG/instagram/backend/src/models');

describe('get has like?', () => {
  it('like model find', () => {
    (PostLikeModal.findOne as jest.Mock).mockResolvedValue({ userId: '1', ownerUserId: '2', hasLiked: true, postId: '12' });
  });
});
