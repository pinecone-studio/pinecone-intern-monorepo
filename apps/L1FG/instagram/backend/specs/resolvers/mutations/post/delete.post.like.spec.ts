import { PostLikeModal } from 'apps/L1FG/instagram/backend/src/models';

jest.mock('apps/L1FG/instagram/backend/src/models');

describe('delete post like', () => {
  it('model find and delete', () => {
    (PostLikeModal.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
  });
});
